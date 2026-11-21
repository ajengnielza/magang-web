
import { useState } from "react";
import { login } from "../../api/auth";
import { keApiError } from "../../api/errors";
import type { ApiError } from "../../api/errors";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import type { Peserta } from "../../api/types";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

type StatusLogin =
  | { status: "diam" }
  | { status: "memproses" }
  | { status: "gagal"; error: ApiError };

interface Akun {
  label: string;
  email: string;
  password: string;
}

const AKUN: Akun[] = [
  {
    label: "Login sebagai peserta",
    email: "dewi@test.com",
    password: "passwordAman123",
  },
  {
    label: "Login sebagai peserta tanpa jurnal",
    email: "kosong@test.com",
    password: "passwordAman123",
  },
];

interface LoginSementaraProps {
  onBerhasil: (peserta: Peserta) => void;
}

export default function LoginSementara({
  onBerhasil,
}: LoginSementaraProps) {
  const [status, setStatus] = useState<StatusLogin>({
    status: "diam",
  });

  async function masuk(akun: Akun) {
    setStatus({ status: "memproses" });

    try {
      const peserta = await login(akun.email, akun.password);
      onBerhasil(peserta);
    } catch (err) {
      setStatus({
        status: "gagal",
        error: keApiError(err),
      });
    }
  }

  return (
    <div>
      <p>
        {AKUN.map((akun) => (
          <span key={akun.email}>
            <Button
              size="sm"
              disabled={status.status === "memproses"}
              onClick={() => masuk(akun)}
            >
              {akun.label}
            </Button>{" "}
          </span>
        ))}
      </p>

      {status.status === "memproses" && (
        <p role="status">Memproses login...</p>
      )}

      {status.status === "gagal" && (
        <Alert tipe="bahaya">
          <p>{pesanUntukPengguna(status.error, "login")}</p>
          {kodeLaporan(status.error) && (
            <p>{kodeLaporan(status.error)}</p>
          )}
        </Alert>
      )}
    </div>
  );
}
