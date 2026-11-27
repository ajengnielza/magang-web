import { useAuth } from "../auth/useAuth";
import Button from "../components/ui/Button";

export default function JurnalApiPage() {
  const { auth, keluar } = useAuth();

  if (auth.status === "memeriksa") {
    return <p role="status">Memeriksa sesi...</p>;
  }

  if (auth.status === "galat") {
    return <p>Terjadi kesalahan saat memeriksa sesi.</p>;
  }

  if (auth.status === "keluar") {
    return <p>Silakan masuk untuk melihat jurnal.</p>;
  }

  return (
    <main>
      <h1>Jurnal {auth.pengguna.nama}</h1>

      <p>
        <Button
          variant="secondary"
          size="sm"
          onClick={keluar}
        >
          Keluar
        </Button>{" "}
        <Button
          variant="danger"
          size="sm"
          onClick={keluar}
        >
          Hapus token (uji 401)
        </Button>
      </p>
    </main>
  );
}