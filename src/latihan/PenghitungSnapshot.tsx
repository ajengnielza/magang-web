import { useState } from "react";
import Button from "../components/ui/Button";

export default function PenghitungSnapshot() {
  const [jumlah, setJumlah] = useState(0);

  function tambahTigaSalah() {
    setJumlah(jumlah + 1); // jumlah di render INI = nilai foto, jadwalkan +1
    setJumlah(jumlah + 1); // masih nilai foto
    setJumlah(jumlah + 1); // masih nilai foto
    console.log("salah, log setelah setter:", jumlah);
  }

  function tambahTigaBenar() {
    setJumlah((j) => j + 1); // bentuk fungsi: pakai nilai TERBARU
    setJumlah((j) => j + 1);
    setJumlah((j) => j + 1);
    console.log("benar, log setelah setter:", jumlah);
  }

  return (
    <>
      <p>Jumlah: {jumlah}</p>
      <Button onClick={tambahTigaSalah}>+3 (salah)</Button>
      <Button variant="secondary" onClick={tambahTigaBenar}>
        +3 (benar)
      </Button>
      <Button variant="danger" onClick={() => setJumlah(0)}>
        Reset
      </Button>
    </>
  );
}