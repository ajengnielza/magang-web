
import { useState, useEffect } from "react";
import DaftarJurnal from "../components/jurnal/DaftarJurnal";
import RingkasanJurnal from "../components/jurnal/RingkasanJurnal";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import Kartu from "../components/ui/Kartu";
import Alert from "../components/ui/Alert";
import FormJurnal from "../components/jurnal/FormJurnal";
import FilterStatusJurnal from "../components/jurnal/FilterStatusJurnal";
import PencarianJurnal from "../components/jurnal/PencarianJurnal";
import { jurnalTiruan } from "../data/jurnalTiruan";
import { pesertaTiruan } from "../data/pesertaTiruan";
import type {
  Jurnal,
  JurnalBaru,
  FilterStatus,
  ReviewJurnal,
} from "../types/jurnal";
import styles from "./DaftarJurnalPage.module.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { adalahDaftarJurnal } from "../utils/guard";

export default function DaftarJurnalPage() {
  const [jurnal, setJurnal] = useLocalStorage<Jurnal[]>(
    "jurnal-magang-v1",
    jurnalTiruan,
    adalahDaftarJurnal
  );

  const [filter, setFilter] = useState<FilterStatus>("semua");
  const [kataKunci, setKataKunci] = useState("");

  const pemilik = pesertaTiruan[0];

  // DATA TURUNAN: tidak disimpan sebagai state
  const kataCari = kataKunci.trim().toLowerCase();

  const tampil = jurnal
    .filter((j) => filter === "semua" || j.statusReview === filter)
    .filter((j) => j.kegiatan.toLowerCase().includes(kataCari));

  // JUDUL TAB DINAMIS
  useEffect(() => {
    document.title = `Jurnal Magang (${jurnal.length})`;
  }, [jurnal.length]);

  function hapusJurnal(id: number) {
    setJurnal((daftar) => daftar.filter((j) => j.id !== id));
  }

  function ubahReview(id: number, review: ReviewJurnal) {
    setJurnal((daftar) =>
      daftar.map((j) =>
        j.id === id
          ? {
              ...j,
              statusReview: review.statusReview,
              catatanMentor:
                review.statusReview === "belum"
                  ? null
                  : review.catatan,
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

        <Kartu judul="Filter">
          <div className={styles.filter} role="search">
            <FilterStatusJurnal
              nilai={filter}
              onUbah={setFilter}
            />

            <PencarianJurnal
              nilai={kataKunci}
              onUbah={setKataKunci}
            />
          </div>
        </Kartu>

        {jurnal.length > 0 && tampil.length === 0 ? (
          <Alert tipe="info">
            Tidak ada jurnal yang cocok dengan filter.
          </Alert>
        ) : (
          <DaftarJurnal
            jurnal={tampil}
            onHapus={hapusJurnal}
            onReview={ubahReview}
          />
        )}
      </main>
    </>
  );
}
