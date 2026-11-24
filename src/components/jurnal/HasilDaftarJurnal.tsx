
import type { StatusPermintaan } from "../../hooks/statusPermintaan";
import type { JurnalListResponse } from "../../api/types";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import DaftarJurnal from "./DaftarJurnal";

type HasilJurnal = {
  daftar: JurnalListResponse["data"];
  meta: JurnalListResponse["meta"];
};

interface HasilDaftarJurnalProps {
  hasil: StatusPermintaan<HasilJurnal>;
  onMuatUlang: () => void;
  onGantiHalaman: (halaman: number) => void;
}

export default function HasilDaftarJurnal({
  hasil,
  onMuatUlang,
  onGantiHalaman,
}: HasilDaftarJurnalProps) {
  if (hasil.status === "memuat") {
    return <p>Memuat jurnal...</p>;
  }

  if (hasil.status === "gagal") {
    return (
      <>
        <p role="alert">
          Gagal memuat jurnal: {hasil.error.message}
        </p>
        <Button onClick={onMuatUlang}>Coba lagi</Button>
      </>
    );
  }

  const { daftar, meta } = hasil.data;

  if (daftar.length === 0) {
    return (
      <>
        <Alert tipe="info">Halaman ini kosong.</Alert>
        {meta.page > 1 && (
          <Button onClick={() => onGantiHalaman(1)}>
            Ke halaman pertama
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      <DaftarJurnal jurnal={daftar} />

      <nav aria-label="Navigasi halaman">
        <p>
          Halaman {meta.page} dari {meta.totalPages}
        </p>

        <Button
          variant="secondary"
          size="sm"
          disabled={meta.page <= 1}
          onClick={() => onGantiHalaman(meta.page - 1)}
        >
          Sebelumnya
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={meta.page >= meta.totalPages}
          onClick={() => onGantiHalaman(meta.page + 1)}
        >
          Berikutnya
        </Button>
      </nav>
    </>
  );
}
