
import { NavLink, Outlet, useNavigate } from "react-router";
import { keluar } from "../../api/auth";
import { cx } from "../../utils/cx";
import Button from "../ui/Button";
import styles from "./LayoutAplikasi.module.css";

function kelasTautan({ isActive }: { isActive: boolean }): string {
  return cx(styles.tautan, isActive && styles.aktif);
}

export default function LayoutAplikasi() {
  const navigate = useNavigate();

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

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            keluar();
            navigate("/login", { replace: true });
          }}
        >
          Keluar
        </Button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
