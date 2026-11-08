
import type { Peserta } from "../types/peserta";
import InfoBaris from "./InfoBaris";

interface PesertaCardProps {
  peserta: Partial<Peserta>;
  tampilkanEmail?: boolean;
  warna?: string;
}

export default function PesertaCard({
  peserta,
  tampilkanEmail = false,
  warna,
}: PesertaCardProps) {
  const nama = peserta.nama ?? "Peserta";
  const sekolah = peserta.sekolah ?? "Sekolah belum diisi";
  const fase = peserta.fase ?? "-";
  const status = peserta.status ?? "Belum ada status";
  const email = peserta.email ?? "";

  return (
    <article className={["kartu-peserta", warna].filter(Boolean).join(" ")}>
      <h3>{nama}</h3>

      <InfoBaris label="Sekolah" nilai={sekolah} />
      <InfoBaris label="Fase" nilai={fase} />
      <InfoBaris label="Status" nilai={status} />

      {tampilkanEmail && email && (
        <InfoBaris label="Email" nilai={email} />
      )}
    </article>
  );
}
