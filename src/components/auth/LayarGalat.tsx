import type { ApiError } from "../../api/errors";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

interface LayarGalatProps {
  error: ApiError;
}

export default function LayarGalat({ error }: LayarGalatProps) {
  const laporan = kodeLaporan(error);

  return (
    <main>
      <Alert tipe="bahaya">
        <p>{pesanUntukPengguna(error)}</p>
        {laporan && <p>{laporan}</p>}
        <Button size="sm" onClick={() => window.location.reload()}>
        Muat ulang
        </Button>
      </Alert>
    </main>
  );
}