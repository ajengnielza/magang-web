import type { Peserta } from "../api/types";

type PesertaTanpaEmailProps = Omit<Peserta, "email">;

export default function PesertaTanpaEmail({ nama, sekolah, fase, status, role }: PesertaTanpaEmailProps) {
  return (
    <p>
      {nama} ({sekolah}), fase {fase}, {status}, {role}
    </p>
  );
}