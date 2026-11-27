import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../auth/useAuth";
import { cx } from "../../utils/cx";
import Button from "../ui/Button";
import styles from "./LayoutAplikasi.module.css";

function kelasTautan({ isActive }: { isActive: boolean }): string {
  return cx(styles.tautan, isActive && styles.aktif);
}

export default function LayoutAplikasi() {
  const { auth, keluar } = useAuth();
  const navigate = useNavigate();

  async function tekanKeluar() {
    await keluar();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className={styles.header}>
        <nav aria-label="Utama" className={styles.nav}>
          <NavLink to="/jurnal" className={kelasTautan}>
            Jurnal
          </NavLink>
          <NavLink to="/profil" className={kelasTautan}>
            Profil
          </NavLink>
        </nav>

        <div>
          {auth.status === "masuk" && (
            <span>{auth.pengguna.nama} </span>
          )}
          <Button variant="secondary" size="sm" onClick={tekanKeluar}>
          Keluar
        </Button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}