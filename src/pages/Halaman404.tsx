
import { Link } from "react-router";

export default function Halaman404() {
  return (
    <section>
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat yang kamu buka tidak ada.</p>
      <p>
        <Link to="/jurnal">Kembali ke daftar jurnal</Link>
      </p>
    </section>
  );
}
