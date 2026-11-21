import { useState } from "react";
import { keluar } from "../api/auth";
import type { Peserta } from "../api/types";
import LoginSementara from "../components/auth/LoginSementara";
import JurnalSaya from "../components/jurnal/JurnalSaya";
import Button from "../components/ui/Button";
import Kartu from "../components/ui/Kartu";

export default function JurnalApiPage() {
  const [peserta, setPeserta] = useState<Peserta | null>(null);

  if (peserta === null) {
    return (
      <main>
        <h1>Jurnal dari API</h1>
        <Kartu judul="Login sementara">
          <LoginSementara onBerhasil={setPeserta} />
        </Kartu>
      </main>
    );
  }

  return (
    <main>
      <h1>Jurnal {peserta.nama}</h1>
      <p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            keluar();
            setPeserta(null);
          }}
        >
          Keluar
        </Button>{" "}
        <Button variant="danger" size="sm" onClick={keluar}>
          Hapus token (uji 401)
        </Button>
      </p>
      <Kartu judul="Jurnal saya">
        <JurnalSaya />
      </Kartu>
    </main>
  );
}