import PesertaCard from "../components/PesertaCard";
import { pesertaTiruan } from "../data/pesertaTiruan";

const budi = pesertaTiruan[0];

export function UjiTipe() {
  return (
    <>
      {/* 1. fase bertipe string */}
      <PesertaCard peserta={{ ...budi, fase: "1" }} />
      {/* 2. prop yang tidak dikenal */}
      <PesertaCard peserta={budi} warna="merah" />
      {/* 3. nama hilang dari objek peserta */}
      <PesertaCard peserta={{ id: 9, sekolah: "SMK", email: "x@mail.com", fase: 1, status: "aktif", role: "peserta" }} />
    </>
  );
}