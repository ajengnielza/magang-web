import type { Peserta } from "../types/peserta";
import PesertaCard from "./PesertaCard";

interface DaftarPesertaProps {
  peserta: Peserta[];
}

export default function DaftarPeserta({ peserta }: DaftarPesertaProps) {
  return (
    <section>
      {peserta.map((p) => (
        <PesertaCard key={p.id} peserta={p} />
      ))}
    </section>
  );
}