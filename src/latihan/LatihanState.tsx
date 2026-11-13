
import Kartu from "../components/ui/Kartu";
import Penghitung from "../latihan/Penghitung";
import PenghitungSnapshot from "../latihan/PenghitungSnapshot";
import PenghitungVariabel from "../latihan/PenghitungVariabel";
import TipeState from "../latihan/TipeState";
import DemoKunciIndeks from "../latihan/DemoKunciIndeks";
import ProfilAlamat from "../latihan/ProfilAlamat";
import EfekStrictMode from "../latihan/EfekStrictMode";
import FormProfil from "../latihan/FormProfil";
import "./LatihanState.css";

export default function LatihanState() {
  return (
    <main className="latihan-page">
      <div className="latihan-container">
        <header className="latihan-header">
          <span className="latihan-label">REACT LEARNING</span>
          <h1>Latihan State</h1>
          <p>
            Pelajari konsep state React melalui berbagai latihan
            interaktif dan contoh penerapan.
          </p>
        </header>

        <div className="latihan-grid">
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
        </div>

        <footer className="latihan-footer">
          React Learning · Latihan Hooks & State
        </footer>
      </div>
    </main>
  );
}