import { useState } from "react";

export default function PenghitungVariabel() {
  const [jumlah, setJumlah] = useState(0);

  function tambah() {
    setJumlah((nilaiSebelumnya) => nilaiSebelumnya + 1);
  }

  return (
    <div>
      <p>Jumlah sekarang: {jumlah}</p>
      <button onClick={tambah}>Tambah</button>
    </div>
  );
}