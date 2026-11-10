
import { useState } from "react";
import Button from "../components/ui/Button";

interface Alamat {
  kota: string;
  kodePos: string;
}

interface Profil {
  nama: string;
  alamat: Alamat;
}

export default function ProfilAlamat() {
  const [profil, setProfil] = useState<Profil>({
    nama: "Budi Santoso",
    alamat: {
      kota: "Malang",
      kodePos: "65145",
    },
  });

  function gantiKota() {
    setProfil((p) => ({
      ...p,
      alamat: {
        ...p.alamat,
        kota: p.alamat.kota === "Malang" ? "Surabaya" : "Malang",
      },
    }));
  }

  return (
    <div>
      <p>
        {profil.nama} · {profil.alamat.kota} · {profil.alamat.kodePos}
      </p>

      <Button onClick={gantiKota}>Ganti kota</Button>
    </div>
  );
}
