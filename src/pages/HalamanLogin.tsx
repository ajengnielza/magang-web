import { useNavigate } from "react-router";
import LoginSementara from "../components/auth/LoginSementara";
import Kartu from "../components/ui/Kartu";

export default function HalamanLogin() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Jurnal Magang</h1>
      <Kartu judul="Masuk">
        <LoginSementara
          onBerhasil={() => navigate("/jurnal", { replace: true })}
        />
      </Kartu>
    </main>
  );
}