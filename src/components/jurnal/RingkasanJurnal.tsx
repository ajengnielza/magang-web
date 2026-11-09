import type { Jurnal } from "../../types/jurnal";
import styles from "./RingkasanJurnal.module.css";

interface RingkasanJurnalProps {
  jurnal: readonly Jurnal[];
}

export default function RingkasanJurnal({
  jurnal,
}: RingkasanJurnalProps) {
  const total = jurnal.length;

  const belum = jurnal.filter(
    (j) => j.statusReview === "belum"
  ).length;

  const sudah = total - belum;

  const baris = [
    { label: "Total", nilai: total },
    { label: "Sudah direview", nilai: sudah },
    { label: "Belum direview", nilai: belum },
  ];

  return (
    <dl className={styles.ringkasan}>
      {baris.map((b) => (
        <div key={b.label} className={styles.butir}>
          <dt>{b.label}</dt>
          <dd>{b.nilai}</dd>
        </div>
      ))}
    </dl>
  );
}