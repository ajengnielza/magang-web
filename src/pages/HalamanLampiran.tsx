
import { Link, useParams } from "react-router";
import { bacaBilanganPositif, bacaId } from "../utils/parameter";
import Halaman404 from "./Halaman404";

export default function HalamanLampiran() {
  const { id, nomor } = useParams<{ id: string; nomor: string }>();

  const idJurnal = bacaId(id);
  const nomorLampiran = bacaBilanganPositif(nomor, 5);

  if (idJurnal === null || nomorLampiran === null) {
    return <Halaman404 />;
  }

  return (
    <section>
      <h1>Lampiran {nomorLampiran}</h1>

      <p>
        Jurnal #{idJurnal}, lampiran ke-{nomorLampiran}.
      </p>

      <p>
        <Link to={`/jurnal/${idJurnal}`}>Kembali ke jurnal</Link>
      </p>
    </section>
  );
}
