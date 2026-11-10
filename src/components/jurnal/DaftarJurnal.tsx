import type { Jurnal, StatusReview } from "../../types/jurnal";
import Alert from "../ui/Alert";
import JurnalCard from "./JurnalCard";

interface DaftarJurnalProps {
  jurnal: readonly Jurnal[];
  onHapus?: (id: number) => void;
  onUbahStatus?: (id: number, status: StatusReview) => void;
}

export default function DaftarJurnal({ jurnal, onHapus, onUbahStatus }: DaftarJurnalProps) {
  
  if (jurnal.length === 0) {
    return <Alert tipe="info">Belum ada jurnal.</Alert>;
  }

  const terbaruDulu = [...jurnal].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section aria-label="Daftar jurnal">
      {terbaruDulu.map((j) => (
        <JurnalCard key={j.id} jurnal={j} onHapus={onHapus} onUbahStatus={onUbahStatus} />
      ))}
    </section>
  );
}