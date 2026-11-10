import { useState } from "react";
import DaftarJurnal from "../components/jurnal/DaftarJurnal";
import RingkasanJurnal from "../components/jurnal/RingkasanJurnal";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import Kartu from "../components/ui/Kartu";
import { jurnalTiruan } from "../data/jurnalTiruan";
import { pesertaTiruan } from "../data/pesertaTiruan";
import type { Jurnal, StatusReview } from "../types/jurnal";

export default function DaftarJurnalPage() {
  const [jurnal, setJurnal] = useState<Jurnal[]>(jurnalTiruan);

  const pemilik = pesertaTiruan[0];

  function hapusJurnal(id: number) {
    setJurnal((daftar) => daftar.filter((j) => j.id !== id));
  }
  

  function ubahStatus(id: number, status: StatusReview) {
    setJurnal((daftar) =>
      daftar.map((j) =>
        j.id === id
          ? {
              ...j,
              statusReview: status,
              // sama seperti backend: status belum mengosongkan catatan mentor
              catatanMentor: status === "belum" ? null : j.catatanMentor,
            }
          : j
      )
    );
  }

  return (
    <>
      <Header judul="Jurnal Magang" namaPeserta={pemilik.nama} />
      <main>
        <Kartu judul="Ringkasan">
          <RingkasanJurnal jurnal={jurnal} />
        </Kartu>
        <p>
          <Button variant="secondary" size="sm" onClick={() => setJurnal(jurnalTiruan)}>
            Pulihkan data contoh
          </Button>
        </p>
        <DaftarJurnal jurnal={jurnal} onHapus={hapusJurnal} onUbahStatus={ubahStatus} />
      </main>
    </>
  );
}