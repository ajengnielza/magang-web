
import { useState } from "react";
import { buatJurnal } from "../api/jurnal";
import type { JurnalBaru } from "../api/types";
import { useJurnalSaya } from "../hooks/useJurnalSaya";
import { kodeLaporan, pesanUntukPengguna } from "../api/pesan";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import FormJurnal from "../components/jurnal/FormJurnal";
import DaftarJurnal from "../components/jurnal/DaftarJurnal";

export default function DaftarJurnalPage() {
  const [halaman, setHalaman] = useState(1);
  const { hasil, muatUlang } = useJurnalSaya(halaman);

  async function tambahJurnal(data: JurnalBaru): Promise<void> {
    await buatJurnal(data);
    setHalaman(1);
    muatUlang();
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
        <main>
          <h1>Jurnal saya</h1>

          <FormJurnal onTambah={tambahJurnal} />

          {daftar.length === 0 ? (
            <p>Belum ada jurnal. Tulis jurnal pertamamu!</p>
          ) : (
            <DaftarJurnal jurnal={daftar} />
          )}

          <nav aria-label="Halaman jurnal">
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
        </main>
      );
    }
  }
}
