import { Navigate } from "react-router";
import { useAuth } from "../auth/useAuth";
import FormLogin from "../components/auth/FormLogin";
import Kartu from "../components/ui/Kartu";

export default function HalamanLogin() {
  const { auth } = useAuth();

  // Jika sudah login, langsung menuju halaman jurnal.
  if (auth.status === "masuk") {
    return <Navigate to="/jurnal" replace />;
  }

  return (
    <main>
      <h1>Jurnal Magang</h1>
      <Kartu judul="Masuk">
        <FormLogin />
      </Kartu>
    </main>
  );
}