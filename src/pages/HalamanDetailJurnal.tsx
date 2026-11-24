import { useParams } from "react-router";
import DetailJurnal from "../components/jurnal/DetailJurnal";
import { bacaId } from "../utils/parameter";
import Halaman404 from "./Halaman404";

export default function HalamanDetailJurnal() {
  const { id } = useParams<{ id: string }>();
  const nomor = bacaId(id);

  if (nomor === null) {
    return <Halaman404 />;
  }

  return <DetailJurnal id={nomor} />;
}