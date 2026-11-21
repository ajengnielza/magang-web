import DaftarJurnalPage from "./pages/DaftarJurnalPage";
import GaleriKomponen from "./pages/GaleriKomponen";
import LatihanState from "./latihan/LatihanState";
import CekServer from "./components/CekServer";
import LatihanApi from "./latihan/LatihanApi";
import JurnalApiPage from "./pages/JurnalApiPage";

export default function App() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("galeri")) return <GaleriKomponen />;
  if (params.has("latihan")) return <LatihanState />;
  if (params.has("cek-server")) return <CekServer />;
  if (params.has("api")) return <LatihanApi />;
  if (params.has("jurnal-api")) return <JurnalApiPage />;

  return <DaftarJurnalPage />;
}