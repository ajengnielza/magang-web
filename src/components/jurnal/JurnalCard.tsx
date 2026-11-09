import type { Jurnal } from "../../types/jurnal";
import Button from "../ui/Button";
import styles from "./JurnalCard.module.css";

interface JurnalCardProps {
  jurnal: Jurnal;
  onHapus?: (id: number) => void;
}

export default function JurnalCard({
  jurnal,
  onHapus,
}: JurnalCardProps) {
  return (
    <article className={styles.kartu}>
      <p>{jurnal.kegiatan}</p>

      {onHapus && (
        <Button
          variant="danger"
          size="sm"
          onClick={() => onHapus(jurnal.id)}
        >
          Hapus
        </Button>
      )}
    </article>
  );
}