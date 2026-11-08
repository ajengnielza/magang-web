import { Fragment } from "react";
import type { Jurnal } from "../types/jurnal";

interface RingkasanJurnalProps {
  jurnal: readonly Jurnal[];
}

export default function RingkasanJurnal({ jurnal }: RingkasanJurnalProps) {
  const total = jurnal.length;
  const belum = jurnal.filter((j) => j.statusReview === "belum").length;
  const sudah = total - belum;

  const baris = [
    { label: "Total jurnal", nilai: total },
    { label: "Sudah direview", nilai: sudah },
    { label: "Belum direview", nilai: belum },
  ];

  return (
    <dl>
      {baris.map((b) => (
        <Fragment key={b.label}>
          <dt>{b.label}</dt>
          <dd>{b.nilai}</dd>
        </Fragment>
      ))}
    </dl>
  );
}