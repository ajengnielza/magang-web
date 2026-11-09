import { useState } from "react";
import Button from "../components/ui/Button";
import { jurnalTiruan } from "../data/jurnalTiruan";
import type { Jurnal, StatusReview } from "../types/jurnal";

export default function TipeState() {
  const [nama, setNama] = useState("");                                   // diinfer: string
  const [aktif, setAktif] = useState(false);                              // diinfer: boolean
  const [jurnal, setJurnal] = useState<Jurnal[]>([]);                     // array kosong: WAJIB generic
  const [terpilih, setTerpilih] = useState<Jurnal | null>(null);          // bisa kosong: union dengan null
  const [filter, setFilter] = useState<"semua" | StatusReview>("semua");  // union literal

  function isiSemua() {
    setNama("Budi");
    setAktif(true);
    setJurnal(jurnalTiruan);
    setTerpilih(jurnalTiruan[0]);
    setFilter("disetujui");
  }

  return (
    <div>
      <Button onClick={isiSemua}>Isi semua state</Button>
      <p>
        {nama} · {aktif ? "aktif" : "tidak aktif"} · {jurnal.length} jurnal ·{" "}
        {terpilih?.kegiatan ?? "belum ada yang dipilih"} · filter: {filter}
      </p>
    </div>
  );
}