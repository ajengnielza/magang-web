
import { useState } from "react";
import type { Jurnal, ReviewJurnal } from "../../types/jurnal";
import { formatTanggal } from "../../utils/format";
import { adalahUrlHttp } from "../../utils/url";
import Button from "../ui/Button";
import FormReview from "./FormReview";
import styles from "./JurnalCard.module.css";
import StatusBadge from "./StatusBadge";

interface JurnalCardProps {
  jurnal: Jurnal;
  onHapus?: (id: number) => void;
  onReview?: (id: number, review: ReviewJurnal) => void;
}

export default function JurnalCard({
  jurnal,
  onHapus,
  onReview,
}: JurnalCardProps) {
  // State lokal untuk detail, review, dan konfirmasi hapus
  const [terbuka, setTerbuka] = useState(false);
  const [sedangReview, setSedangReview] = useState(false);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);

  const jumlahLampiran = jurnal.lampiran?.length ?? 0;

  const link =
    jurnal.linkCommit !== null && adalahUrlHttp(jurnal.linkCommit)
      ? jurnal.linkCommit
      : null;

  // Data turunan, bukan state
  const adaDetail =
    Boolean(jurnal.hambatan) ||
    Boolean(jurnal.catatanMentor) ||
    jumlahLampiran > 0 ||
    link !== null;

  const detailTampil = terbuka && adaDetail;

  return (
    <article className={styles.kartu}>
      <div className={styles.kepala}>
        <time dateTime={jurnal.createdAt}>
          {formatTanggal(jurnal.createdAt)}
        </time>

        <StatusBadge status={jurnal.statusReview} />
      </div>

      <p className={styles.kegiatan}>{jurnal.kegiatan}</p>

      <div className={styles.aksi}>
        {adaDetail && (
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={detailTampil}
            onClick={() => setTerbuka((t) => !t)}
          >
            {detailTampil ? "Sembunyikan detail" : "Tampilkan detail"}
          </Button>
        )}

        {onReview && (
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={sedangReview}
            onClick={() => setSedangReview((s) => !s)}
          >
            {sedangReview ? "Tutup review" : "Review"}
          </Button>
        )}

        {onHapus && !konfirmasiHapus && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => setKonfirmasiHapus(true)}
          >
            Hapus
          </Button>
        )}
      </div>

      {/* Konfirmasi hapus dua langkah */}
      {onHapus && konfirmasiHapus && (
        <div
          className={styles.konfirmasi}
          role="group"
          aria-label="Konfirmasi hapus jurnal"
        >
          <span>Yakin menghapus jurnal ini?</span>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onHapus(jurnal.id)}
          >
            Ya, hapus
          </Button>

          <Button
            variant="secondary"
            size="sm"
            autoFocus
            onClick={() => setKonfirmasiHapus(false)}
          >
            Batal
          </Button>
        </div>
      )}

      {/* Form review mentor */}
      {sedangReview && onReview && (
        <FormReview
          awal={{
            statusReview: jurnal.statusReview,
            catatan: jurnal.catatanMentor ?? "",
          }}
          onSimpan={(review) => {
            onReview(jurnal.id, review);
            setSedangReview(false);
          }}
          onBatal={() => setSedangReview(false)}
        />
      )}

      {/* Detail jurnal */}
      {detailTampil && (
        <div className={styles.detail}>
          {jurnal.hambatan && <p>Hambatan: {jurnal.hambatan}</p>}

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
        </div>
      )}
    </article>
  );
}
