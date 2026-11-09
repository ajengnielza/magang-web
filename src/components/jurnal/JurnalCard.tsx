import type { Jurnal } from "../../types/jurnal";
import { formatTanggal } from "../../utils/format";
import { adalahUrlHttp } from "../../utils/url";
import Button from "../ui/Button";
import styles from "./JurnalCard.module.css";
import StatusBadge from "./StatusBadge";

interface JurnalCardProps {
  jurnal: Jurnal;
  onHapus?: (id: number) => void;
}

export default function JurnalCard({
  jurnal,
  onHapus,
}: JurnalCardProps) {
  const jumlahLampiran = jurnal.lampiran?.length ?? 0;

  const link =
    jurnal.linkCommit !== null && adalahUrlHttp(jurnal.linkCommit)
      ? jurnal.linkCommit
      : null;

  return (
    <article className={styles.kartu}>
      <div className={styles.kepala}>
        <time dateTime={jurnal.createdAt}>
          {formatTanggal(jurnal.createdAt)}
        </time>

        <StatusBadge status={jurnal.statusReview} />
      </div>

      <p className={styles.kegiatan}>{jurnal.kegiatan}</p>

      {jurnal.hambatan && (
        <p>Hambatan: {jurnal.hambatan}</p>
      )}

      {jurnal.catatanMentor && (
        <p>Catatan mentor: {jurnal.catatanMentor}</p>
      )}

      {(jumlahLampiran > 0 || link !== null) && (
        <p className={styles.tambahan}>
          {jumlahLampiran > 0 && (
            <span>Lampiran ({jumlahLampiran})</span>
          )}

          {jumlahLampiran > 0 && link !== null && " · "}

          {link !== null && (
            <a href={link} target="_blank" rel="noreferrer">
              Lihat commit
            </a>
          )}
        </p>
      )}

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