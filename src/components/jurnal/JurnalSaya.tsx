
import { useState } from "react";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import { useJurnalSaya } from "../../hooks/useJurnalSaya";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import DaftarJurnal from "./DaftarJurnal";

export default function JurnalSaya() {
  const [halaman, setHalaman] = useState(1);
  const { hasil, muatUlang } = useJurnalSaya(halaman);

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

      if (daftar.length === 0) {
        if (meta.total === 0) {
          return <p>Belum ada jurnal. Tulis jurnal pertamamu!</p>;
        }

        return (
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
        );
      }

      return (
        <>
          <DaftarJurnal jurnal={daftar} />
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
      );
    }
  }
}
