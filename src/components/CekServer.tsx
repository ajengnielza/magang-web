
import { useState } from "react";

const ALAMAT = "/api/v1/health";

export default function CekServer() {
  const [hasil, setHasil] = useState("Belum diperiksa");

  async function cekServer() {
    try {
      const response = await fetch(ALAMAT);
      const data = await response.json();

      setHasil(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Gagal menghubungi server:", error);
      setHasil("Server tidak terjangkau");
    }
  }

  return (
    <section>
      <h2>Cek Koneksi Server</h2>
      <button onClick={cekServer}>Cek Server</button>
      <pre>{hasil}</pre>
    </section>
  );
}
