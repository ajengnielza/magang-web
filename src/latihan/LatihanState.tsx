
import Kartu from "../components/ui/Kartu";
import Penghitung from "../latihan/Penghitung";
import PenghitungSnapshot from "../latihan/PenghitungSnapshot";
import PenghitungVariabel from "../latihan/PenghitungVariabel";
import TipeState from "../latihan/TipeState";
import DemoKunciIndeks from "../latihan/DemoKunciIndeks";
import ProfilAlamat from "../latihan/ProfilAlamat";
import EfekStrictMode from "../latihan/EfekStrictMode";
import FormProfil from "../latihan/FormProfil";

export default function LatihanState() {
  return (
    <main>
      <h1>Latihan State</h1>

      <Kartu judul="Variabel biasa (gagal)">
        <PenghitungVariabel />
      </Kartu>

      <Kartu judul="Dua instans, dua state">
        <Penghitung />
        <Penghitung />
      </Kartu>

      <Kartu judul="Snapshot">
        <PenghitungSnapshot />
      </Kartu>

      <Kartu judul="Tipe state">
        <TipeState />
      </Kartu>

      <Kartu judul="Bug key indeks">
        <DemoKunciIndeks />
      </Kartu>

      <Kartu judul="Latihan objek bersarang">
        <ProfilAlamat />
      </Kartu>
        <Kartu judul="StrictMode dan efek">
    <EfekStrictMode />
  </Kartu>
  <Kartu judul="Form profil">
  <FormProfil />
</Kartu>
    </main>
  );
}
