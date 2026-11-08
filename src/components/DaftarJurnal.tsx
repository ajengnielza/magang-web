import type { Jurnal } from "../types/jurnal";
import { formatTanggal } from "../utils/format";

interface DaftarJurnalProps {
  jurnal: readonly Jurnal[];
}

export default function DaftarJurnal({ jurnal }: DaftarJurnalProps) {
  if (jurnal.length === 0) {
    return <p>Belum ada jurnal.</p>;
  }
  const terbaruDulu = [...jurnal].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

  return (
    <section>
      {terbaruDulu.map((j) =>  (
        <article key={j.id} className="kartu">
          <h3>{j.kegiatan}</h3>

          <p>
            {formatTanggal(j.createdAt)} · {j.statusReview}
          </p>

          {j.hambatan && <p>Hambatan: {j.hambatan}</p>}

          {j.lampiran && j.lampiran.length > 0 && (
            <p>{j.lampiran.length} lampiran</p>
          )}
        </article>
      ))}
    </section>
  );
}