
import Header from "./components/Header";
import Kartu from "./components/Kartu";
import DaftarPeserta from "./components/DaftarPeserta";
import NomorUrut from "./components/NomorUrut";
import DaftarJurnal from "./components/DaftarJurnal";
import JumlahJurnal from "./components/JumlahJurnal";
import RingkasanJurnal from "./components/RingkasanJurnal";
import HasilJurnal from "./components/HasilJurnal";

import { pesertaTiruan } from "./data/pesertaTiruan";
import { jurnalTiruan } from "./data/jurnalTiruan";

import GaleriKomponen from "./pages/GaleriKomponen";

export default function App() {
  // Tampilkan galeri jika URL memiliki ?galeri
  if (new URLSearchParams(window.location.search).has("galeri")) {
    return <GaleriKomponen />;
  }

  // Halaman Jurnal Magang tetap seperti sebelumnya
  return (
    <main>
      <Header judul="Jurnal Magang" />

      <Kartu judul="Daftar Peserta">
        <DaftarPeserta peserta={pesertaTiruan} />

        {pesertaTiruan.map((peserta, index) => (
          <NomorUrut key={peserta.id} nomor={index + 1} />
        ))}
      </Kartu>

      <Kartu judul="Peserta Kosong">
        <DaftarPeserta peserta={[]} />
      </Kartu>

      <Kartu judul="Daftar Jurnal">
        <DaftarJurnal jurnal={jurnalTiruan} />
      </Kartu>

      <Kartu judul="Jurnal Kosong">
        <DaftarJurnal jurnal={[]} />
      </Kartu>

      <Kartu judul="Jumlah Jurnal">
        <JumlahJurnal jumlah={4} />
        <JumlahJurnal jumlah={0} />
      </Kartu>

      <Kartu judul="Ringkasan Jurnal">
        <RingkasanJurnal jurnal={jurnalTiruan} />
      </Kartu>

      <Kartu judul="Jurnal Berhasil">
        <HasilJurnal status="berhasil" data={jurnalTiruan} />
      </Kartu>

      <Kartu judul="Jurnal Memuat">
        <HasilJurnal status="memuat" />
      </Kartu>

      <Kartu judul="Jurnal Gagal">
        <HasilJurnal status="gagal" pesan="Koneksi terputus" />
      </Kartu>
    </main>
  );
}
