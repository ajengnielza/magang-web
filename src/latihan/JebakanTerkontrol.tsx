
import { useState } from "react";

export default function JebakanTerkontrol() {
  const [tetap] = useState("tidak bisa diubah");
  const [awalKosong, setAwalKosong] = useState("");

  return (
    <div>
      {/* Input pertama: memang sengaja tidak bisa diubah */}
      <input
        aria-label="Tanpa onChange"
        value={tetap}
        readOnly
      />

      {/* Input kedua: selalu controlled sejak awal */}
      <input
        aria-label="Awal kosong"
        value={awalKosong}
        onChange={(e) => setAwalKosong(e.target.value)}
      />
    </div>
  );
}
