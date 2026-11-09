
import type { MouseEvent } from "react";
import Alert, { type AlertTipe } from "../components/ui/Alert";
import Badge, { type BadgeVariasi } from "../components/ui/Badge";
import Button, {
  type ButtonSize,
  type ButtonVariant,
} from "../components/ui/Button";
import Kartu from "../components/Kartu";
import StatusBadge from "../components/jurnal/StatusBadge";
import styles from "./GaleriKomponen.module.css";
import type { StatusReview } from "../types/jurnal";
import JurnalCard from "../components/jurnal/JurnalCard";
import { jurnalTiruan } from "../data/jurnalTiruan";

const varianTombol: ButtonVariant[] = [
  "primary",
  "secondary",
  "danger",
];

const ukuranTombol: ButtonSize[] = ["md", "sm"];

const tipeAlert: AlertTipe[] = [
  "info",
  "sukses",
  "bahaya",
];

const varianBadge: BadgeVariasi[] = [
  "netral",
  "sukses",
  "peringatan",
  "bahaya",
];

const daftarStatus: StatusReview[] = [
  "belum",
  "disetujui",
  "revisi",
];

function cetakKoordinat(e: MouseEvent<HTMLButtonElement>) {
  console.log("Diklik di posisi", e.clientX, e.clientY);
}

export default function GaleriKomponen() {
 
return (
  <main>
    <h1>Galeri Komponen</h1>

    <Kartu judul="Button">
      {ukuranTombol.map((u) => (
        <div key={u}>
          <h3>Ukuran {u}</h3>

          <div className={styles.grup}>
            {varianTombol.map((v) => (
              <Button key={v} variant={v} size={u}>
                {v} {u}
              </Button>
            ))}

            <Button size={u} disabled>
              Disabled {u}
            </Button>
          </div>
        </div>
      ))}

      <div className={styles.grup}>
        <Button onClick={cetakKoordinat}>
          Cetak koordinat klik
        </Button>
      </div>
    </Kartu>

    <Kartu judul="Alert">
      <div className={styles.grupAlert}>
        {tipeAlert.map((t) => (
          <Alert key={t} tipe={t}>
            Contoh alert bertipe {t}
          </Alert>
        ))}
      </div>
    </Kartu>

    <Kartu judul="Badge">
      <div className={styles.grupBadge}>
        {varianBadge.map((v) => (
          <Badge key={v} variasi={v}>
            {v}
          </Badge>
        ))}
      </div>
    </Kartu>

    <Kartu judul="StatusBadge">
      <div className={styles.grupBadge}>
        {daftarStatus.map((s) => (
          <StatusBadge key={s} status={s} />
        ))}
      </div>
    </Kartu>

    <Kartu judul="JurnalCard">
  {/* Keadaan 1: tanpa callback */}
  <JurnalCard jurnal={jurnalTiruan[0]} />

  {/* Keadaan 2: dengan callback */}
  <JurnalCard
    jurnal={jurnalTiruan[1]}
    onHapus={(id) => console.log("hapus", id)}
  />
</Kartu>
  </main>
);
}
