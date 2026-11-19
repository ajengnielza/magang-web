
import { useState } from "react";
import { login } from "../api/auth";
import { setAccessToken } from "../api/client";
import { ApiError, keApiError } from "../api/errors";
import {
  ambilJurnalSaya,
  ambilSemuaJurnal,
  buatJurnal,
} from "../api/jurnal";
import { kodeLaporan, pesanUntukPengguna } from "../api/pesan";
import Button from "../components/ui/Button";

// Sesuaikan dengan akun di database-mu
const PESERTA = { email: "dewi@test.com", password: "passwordAman123" };
const MENTOR = { email: "mentor@test.com", password: "mentor123" };

export default function UjiKlien() {
  const [hasil, setHasil] = useState("Belum ada percobaan.");

  async function jalankan(
    nama: string,
    fn: () => Promise<unknown>
  ) {
    setHasil(`${nama}: memuat...`);

    try {
      const data = await fn();

      setHasil(
        `${nama}: BERHASIL\n${JSON.stringify(data, null, 2).slice(0, 700)}`
      );
    } catch (err) {
      const e = keApiError(err);

      setHasil(
        `${nama}: ApiError\n` +
          `status ${e.status} · kode ${e.kode}\n` +
          `pesan server: ${e.message}\n` +
          `untuk pengguna: ${pesanUntukPengguna(e)}\n` +
          `${kodeLaporan(e) ?? "(tanpa kode laporan)"}\n` +
          `detail: ${JSON.stringify(e.detail)}`
      );
    }
  }

  // Menguji seluruh pesan error dan kode laporan.
  function tampilkanSemuaPesan() {
    const contoh: ApiError[] = [
      new ApiError("x", 0, "NETWORK_ERROR"),
      new ApiError("x", 401, "UNAUTHORIZED"),
      new ApiError("x", 403, "FORBIDDEN"),
      new ApiError("x", 409, "CONFLICT"),
      new ApiError("x", 422, "VALIDATION_ERROR"),
      new ApiError("x", 429, "RATE_LIMITED"),
      new ApiError("x", 500, "BAD_RESPONSE"),
    ];

    const daftarPesan = contoh.map(
      (error) =>
        `${error.kode} -> ${pesanUntukPengguna(error)}`
    );

    // UNAUTHORIZED dengan konteks berbeda.
    const loginError = new ApiError("x", 401, "UNAUTHORIZED");

    daftarPesan.push(
      `UNAUTHORIZED (login) -> ${pesanUntukPengguna(loginError, "login")}`
    );

    daftarPesan.push(
      `UNAUTHORIZED (umum) -> ${pesanUntukPengguna(loginError, "umum")}`
    );

    // Menguji kode laporan dengan requestId.
    const denganRequestId = new ApiError(
      "x",
      500,
      "BAD_RESPONSE",
      [],
      "test-request-123"
    );

    const tanpaRequestId = new ApiError(
      "x",
      500,
      "BAD_RESPONSE"
    );

    daftarPesan.push(
      `Kode laporan tersedia -> ${kodeLaporan(denganRequestId)}`
    );

    daftarPesan.push(
      `Kode laporan tidak tersedia -> ${kodeLaporan(tanpaRequestId)}`
    );

    setHasil(daftarPesan.join("\n"));
  }

  return (
    <div>
      <p>
        <Button
          size="sm"
          onClick={() =>
            jalankan("Login peserta", () =>
              login(PESERTA.email, PESERTA.password)
            )
          }
        >
          Login peserta (benar)
        </Button>{" "}
        <Button
          size="sm"
          variant="danger"
          onClick={() =>
            jalankan("Login salah", () =>
              login(PESERTA.email, "salah-salah")
            )
          }
        >
          Login password salah
        </Button>{" "}
        <Button
          size="sm"
          onClick={() =>
            jalankan("Login mentor", () =>
              login(MENTOR.email, MENTOR.password)
            )
          }
        >
          Login mentor
        </Button>{" "}
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setAccessToken(null);
            setHasil("Token dihapus dari memori.");
          }}
        >
          Hapus token
        </Button>
      </p>

      <p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => jalankan("Jurnal saya", () => ambilJurnalSaya())}
        >
          Jurnal saya
        </Button>{" "}
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            jalankan("Semua jurnal", () => ambilSemuaJurnal())
          }
        >
          Semua jurnal (mentor)
        </Button>{" "}
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            jalankan("Buat jurnal valid", () =>
              buatJurnal({
                kegiatan: "Uji klien API dari halaman latihan frontend",
              })
            )
          }
        >
          Buat jurnal valid
        </Button>{" "}
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            jalankan("Buat jurnal pendek", () =>
              buatJurnal({ kegiatan: "pendek" })
            )
          }
        >
          Buat jurnal pendek
        </Button>
      </p>

      <p>
        <Button
          size="sm"
          variant="secondary"
          onClick={tampilkanSemuaPesan}
        >
          Uji Semua Pesan Error
        </Button>
      </p>

      <pre aria-live="polite">{hasil}</pre>
    </div>
  );
}
