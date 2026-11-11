import { useState } from "react";
import DaftarJurnal from "../components/jurnal/DaftarJurnal";
import RingkasanJurnal from "../components/jurnal/RingkasanJurnal";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import Kartu from "../components/ui/Kartu";
import { jurnalTiruan } from "../data/jurnalTiruan";
import { pesertaTiruan } from "../data/pesertaTiruan";
import type { Jurnal, JurnalBaru, StatusReview } from "../types/jurnal";
import FormJurnal from "../components/jurnal/FormJurnal";
import JebakanTerkontrol from "../latihan/JebakanTerkontrol";
import FormProfil from "../latihan/FormProfil";
import KolomLain from "../latihan/KolomLain";

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

  function tambahJurnal(data: JurnalBaru) {
  const baru: Jurnal = {
    id: Math.max(0, ...jurnal.map((j) => j.id)) + 1,
    pesertaId: pemilik.id,
    reviewerId: null,
    ...data,
    lampiran: null,
    statusReview: "belum",
    catatanMentor: null,
    createdAt: new Date().toISOString(),
  };

  setJurnal((daftar) => [baru, ...daftar]);
}

  
return (
  <>
    <Header judul="Jurnal Magang" namaPeserta={pemilik.nama} />

    <main>
      <Kartu judul="Ringkasan">
        <RingkasanJurnal jurnal={jurnal} />
      </Kartu>

      <p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setJurnal(jurnalTiruan)}
        >
          Pulihkan data contoh
        </Button>
      </p>

      <Kartu judul="Tambah jurnal">
        <FormJurnal onTambah={tambahJurnal} />
      </Kartu>

      <DaftarJurnal
        jurnal={jurnal}
        onHapus={hapusJurnal}
        onUbahStatus={ubahStatus}
      />

      <Kartu judul="Jebakan terkontrol">
        <JebakanTerkontrol />
      </Kartu>
      <Kartu judul="Form profil">
        <FormProfil />
      </Kartu>
      <Kartu judul="Select dan Checkbox">
      <KolomLain />
    </Kartu>
    </main>
  </>
);
}