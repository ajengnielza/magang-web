import { useState } from "react";
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

export default function JurnalCard({ jurnal, onHapus }: JurnalCardProps) {
  const [terbuka, setTerbuka] = useState(false);

  const jumlahLampiran = jurnal.lampiran?.length ?? 0;
  const link =
    jurnal.linkCommit !== null && adalahUrlHttp(jurnal.linkCommit) ? jurnal.linkCommit : null;

  // Data turunan, BUKAN state: dihitung dari props setiap render
  const adaDetail =
    Boolean(jurnal.hambatan) || Boolean(jurnal.catatanMentor) || jumlahLampiran > 0 || link !== null;

  return (
    <article className={styles.kartu}>
      <div className={styles.kepala}>
        <time dateTime={jurnal.createdAt}>{formatTanggal(jurnal.createdAt)}</time>
        <StatusBadge status={jurnal.statusReview} />
      </div>

      <p className={styles.kegiatan}>{jurnal.kegiatan}</p>

      <div className={styles.aksi}>
        {adaDetail && (
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={terbuka}
            onClick={() => setTerbuka((t) => !t)}
          >
            {terbuka ? "Sembunyikan detail" : "Tampilkan detail"}
          </Button>
        )}
        {onHapus && (
          <Button variant="danger" size="sm" onClick={() => onHapus(jurnal.id)}>
            Hapus
          </Button>
        )}
      </div>

      {terbuka && (
        <div className={styles.detail}>
          {jurnal.hambatan && <p>Hambatan: {jurnal.hambatan}</p>}
          {jurnal.catatanMentor && <p>Catatan mentor: {jurnal.catatanMentor}</p>}

          {(jumlahLampiran > 0 || link !== null) && (
            <p className={styles.tambahan}>
              {jumlahLampiran > 0 && <span>Lampiran ({jumlahLampiran})</span>}
              {jumlahLampiran > 0 && link !== null && " · "}
              {link !== null && (
                <a href={link} target="_blank" rel="noreferrer">
                  Lihat commit
                </a>
              )}
            </p>
          )}
        </div>
      )}
    </article>
  );
}