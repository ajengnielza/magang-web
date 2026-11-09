import DaftarJurnal from "../components/jurnal/DaftarJurnal";
import RingkasanJurnal from "../components/jurnal/RingkasanJurnal";
import Header from "../components/layout/Header";
import Kartu from "../components/ui/Kartu";
import { jurnalTiruan } from "../data/jurnalTiruan";
import { pesertaTiruan } from "../data/pesertaTiruan";

export default function DaftarJurnalPage() {
  const pemilik = pesertaTiruan[0];

  return (
    <>
      <Header judul="Jurnal Magang" namaPeserta={pemilik.nama} />
      <main>
        <Kartu judul="Ringkasan">
          <RingkasanJurnal jurnal={jurnalTiruan} />
        </Kartu>
        {/* sementara: dihubungkan ke state di Selasa */}
        <DaftarJurnal jurnal={jurnalTiruan} onHapus={(id) => console.log("Hapus jurnal", id)} />
      </main>
    </>
  );
}