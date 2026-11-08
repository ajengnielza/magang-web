import PesertaCard from "../components/PesertaCard";
import { pesertaTiruan } from "../data/pesertaTiruan";
import HasilJurnal from "../components/HasilJurnal";

const budi = pesertaTiruan[0];

export function UjiTipe() {
  return (
    <>
      {/* 1. Fase bertipe string */}
      <PesertaCard peserta={{ ...budi, fase: "1" }} />

      {/* 2. Prop yang tidak dikenal */}
      <PesertaCard peserta={budi} warna="merah" />

      {/* 3. Nama hilang dari objek peserta */}
      <PesertaCard
        peserta={{
          id: 9,
          sekolah: "SMK",
          email: "x@mail.com",
          fase: 1,
          status: "aktif",
          role: "peserta",
        }}
      />

      {/* 4. Status berhasil tanpa data */}
      {/* @ts-expect-error data wajib ada saat status berhasil */}
      <HasilJurnal status="berhasil" />
    </>
  );
}