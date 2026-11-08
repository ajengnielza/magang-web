import type { Peserta } from "../types/peserta";
import PesertaCard from "./PesertaCard";

interface DaftarPesertaProps {
  peserta: Peserta[];
}

export default function DaftarPeserta({ peserta }: DaftarPesertaProps) {
  if (peserta.length === 0) {
    return <p>Belum ada peserta.</p>;
  }

  return (
    <section>
      {peserta.map((p) => (
        <PesertaCard key={p.id} peserta={p} />
      ))}
    </section>
  );
}

