import Header from "./components/Header";
import DaftarPeserta from "./components/DaftarPeserta";
import NomorUrut from "./components/NomorUrut";
import { pesertaTiruan } from "./data/pesertaTiruan";

export default function App() {
  return (
    <main>
      <Header judul="Jurnal Magang" />

      <DaftarPeserta peserta={pesertaTiruan} />

      {pesertaTiruan.map((p, i) => (
        <NomorUrut key={p.id} nomor={i + 1} />
      ))}
    </main>
  );
}