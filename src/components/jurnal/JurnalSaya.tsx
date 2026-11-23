
import { useState } from "react";
import {
  buatJurnal,
  hapusJurnal as hapusJurnalApi,
} from "../../api/jurnal";
import { keApiError } from "../../api/errors";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import type { JurnalBaru } from "../../api/types";
import { useJurnalSaya } from "../../hooks/useJurnalSaya";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import DaftarJurnal from "./DaftarJurnal";
import FormJurnal from "./FormJurnal";

export default function JurnalSaya() {
  const [halaman, setHalaman] = useState(1);
  const [errorAksi, setErrorAksi] = useState<string | null>(null);
  const [kodeErrorAksi, setKodeErrorAksi] = useState<string | null>(null);

  const { hasil, muatUlang } = useJurnalSaya(halaman);

  function tampilkanError(error: unknown) {
    const apiError = keApiError(error);

    setErrorAksi(pesanUntukPengguna(apiError));
    setKodeErrorAksi(kodeLaporan(apiError));
  }

  async function tambahJurnal(data: JurnalBaru): Promise<void> {
    setErrorAksi(null);
    setKodeErrorAksi(null);

    try {
      await buatJurnal(data);
      setHalaman(1);
      muatUlang();
    } catch (error: unknown) {
      tampilkanError(error);
      throw error;
    }
  }

  async function hapusJurnal(id: number): Promise<void> {
    setErrorAksi(null);
    setKodeErrorAksi(null);

    try {
      await hapusJurnalApi(id);
      muatUlang();
    } catch (error: unknown) {
      tampilkanError(error);
    }
  }

  switch (hasil.status) {
    case "memuat":
      return <p role="status">Memuat jurnal...</p>;

    case "gagal": {
      const laporan = kodeLaporan(hasil.error);

      return (
        <Alert tipe="bahaya">
          <p>{pesanUntukPengguna(hasil.error)}</p>
          {laporan && <p>{laporan}</p>}
          <Button size="sm" onClick={muatUlang}>
            Coba lagi
          </Button>
        </Alert>
      );
    }

    case "berhasil": {
      const { daftar, meta } = hasil.data;

      return (
        <>
          {errorAksi && (
            <Alert tipe="bahaya">
              <p>{errorAksi}</p>
              {kodeErrorAksi && <p>{kodeErrorAksi}</p>}
            </Alert>
          )}

          <FormJurnal onTambah={tambahJurnal} />

          {daftar.length === 0 ? (
            meta.total === 0 ? (
              <p>Belum ada jurnal. Tulis jurnal pertamamu!</p>
            ) : (
              <>
                <p>Halaman ini kosong.</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setHalaman(1)}
                >
                  Ke halaman pertama
                </Button>
              </>
            )
          ) : (
            <>
              <DaftarJurnal jurnal={daftar} onHapus={hapusJurnal} />

              <nav aria-label="Halaman">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={!meta.hasPrev}
                  onClick={() => setHalaman((h) => h - 1)}
                >
                  Sebelumnya
                </Button>

                <span>
                  {" "}
                  Halaman {meta.page} dari {meta.totalPages}{" "}
                </span>

                <Button
                  size="sm"
                  variant="secondary"
                  disabled={!meta.hasNext}
                  onClick={() => setHalaman((h) => h + 1)}
                >
                  Berikutnya
                </Button>
              </nav>
            </>
          )}
        </>
      );
    }
  }
}
