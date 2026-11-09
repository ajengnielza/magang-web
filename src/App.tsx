import DaftarJurnal from "./components/jurnal/DaftarJurnal";
import RingkasanJurnal from "./components/jurnal/RingkasanJurnal";
import Header from "./components/layout/Header";
import Kartu from "./components/ui/Kartu";
import { jurnalTiruan } from "./data/jurnalTiruan";
import { pesertaTiruan } from "./data/pesertaTiruan";
import GaleriKomponen from "./pages/GaleriKomponen";

export default function App() {
  if (new URLSearchParams(window.location.search).has("galeri")) {
    return <GaleriKomponen />;
  }

  const pemilik = pesertaTiruan[0];

if (!pemilik) {
  return <p>Data peserta tidak ditemukan.</p>;
}

  return (
    <>
      <Header judul="Jurnal Magang" namaPeserta={pemilik.nama} />
      <main>
        <Kartu judul="Ringkasan">
          <RingkasanJurnal jurnal={jurnalTiruan} />
        </Kartu>
        {/* sementara: dihubungkan ke state di Minggu 18 */}
        <DaftarJurnal jurnal={jurnalTiruan} onHapus={(id) => console.log("Hapus jurnal", id)} />
      </main>
    </>
  );
}