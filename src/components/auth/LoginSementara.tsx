
import { useState, type FormEvent } from "react";
import { login } from "../../api/auth";
import { keApiError } from "../../api/errors";
import type { ApiError } from "../../api/errors";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import type { Peserta } from "../../api/types";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import styles from "./LoginSementara.module.css";

interface LoginSementaraProps {
  onBerhasil: (peserta: Peserta) => void;
}

type StatusLogin =
  | { status: "diam" }
  | { status: "memproses" }
  | { status: "gagal"; error: ApiError };

export default function LoginSementara({
  onBerhasil,
}: LoginSementaraProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<StatusLogin>({
    status: "diam",
  });

  async function masuk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ status: "memproses" });

    try {
      const peserta = await login(email, password);
      onBerhasil(peserta);
    } catch (err: unknown) {
      setStatus({
        status: "gagal",
        error: keApiError(err),
      });
    }
  }

  const sedangMemproses = status.status === "memproses";

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>📚</div>
          <h2 className={styles.title}>Jurnal dari API</h2>
          <p className={styles.description}>
            Silakan masuk menggunakan akun peserta untuk melihat
            dan mengelola jurnal harian.
          </p>
        </div>

        <form className={styles.form} onSubmit={masuk}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="contoh@email.com"
              autoComplete="username"
              required
              disabled={sedangMemproses}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Masukkan password"
              autoComplete="current-password"
              required
              disabled={sedangMemproses}
            />
          </div>

          {status.status === "gagal" && (
            <Alert tipe="bahaya">
              <p>{pesanUntukPengguna(status.error, "login")}</p>
              {kodeLaporan(status.error) && (
                <p>{kodeLaporan(status.error)}</p>
              )}
            </Alert>
          )}

          <div className={styles.action}>
            <Button type="submit" disabled={sedangMemproses}>
              {sedangMemproses ? "Memproses login..." : "Masuk"}
            </Button>
          </div>
        </form>

        <p className={styles.footer}>
          Sistem Jurnal Peserta
        </p>
      </section>
    </main>
  );
}
