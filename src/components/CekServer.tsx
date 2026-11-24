
import { useState } from "react";
import { request } from "../api/client";

export default function CekServer() {
  const [hasil, setHasil] = useState("Belum diperiksa");

  async function cekServer() {
    try {
      const data = await request<unknown>("GET", "/health");
      setHasil(JSON.stringify(data, null, 2));
    } catch {
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
