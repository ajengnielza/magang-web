import Kartu from "../components/ui/Kartu";
import { BASE_URL } from "../config";
import UjiKlien from "../latihan/UjiKlien";

export default function LatihanApi() {
  return (
    <main>
      <h1>Latihan API</h1>

      <Kartu judul="Konfigurasi">
        <p>BASE_URL: {BASE_URL}</p>
      </Kartu>

      <Kartu judul="Uji klien API">
        <UjiKlien />
      </Kartu>
    </main>
  );
}