import DaftarJurnalPage from "./pages/DaftarJurnalPage";
import GaleriKomponen from "./pages/GaleriKomponen";
import LatihanState from "./latihan/LatihanState";

export default function App() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("galeri")) return <GaleriKomponen />;
  if (params.has("latihan")) return <LatihanState />;

  return <DaftarJurnalPage />;
}