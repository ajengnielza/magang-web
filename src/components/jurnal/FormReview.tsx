
import { useState } from "react";
import type { FormEvent } from "react";
import type { ReviewJurnal, StatusReview } from "../../types/jurnal";
import Button from "../ui/Button";
import styles from "./FormReview.module.css";

interface FormReviewProps {
  awal: ReviewJurnal;
  onSimpan: (review: ReviewJurnal) => void;
  onBatal: () => void;
}

function adalahStatusReview(nilai: string): nilai is StatusReview {
  return (
    nilai === "belum" ||
    nilai === "disetujui" ||
    nilai === "revisi"
  );
}

export default function FormReview({
  awal,
  onSimpan,
  onBatal,
}: FormReviewProps) {
  const [statusReview, setStatusReview] = useState<StatusReview>(
    awal.statusReview
  );
  const [catatan, setCatatan] = useState(awal.catatan);
  const [error, setError] = useState("");

  const perluCatatan = statusReview !== "belum";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const catatanBersih = catatan.trim();

    if (perluCatatan && catatanBersih.length < 5) {
      setError("Catatan wajib diisi minimal 5 karakter.");
      return;
    }

    if (catatanBersih.length > 1000) {
      setError("Catatan maksimal 1.000 karakter.");
      return;
    }

    onSimpan({
      statusReview,
      catatan: perluCatatan ? catatanBersih : "",
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="status-review">Status review</label>

        <select
          id="status-review"
          value={statusReview}
          onChange={(e) => {
            if (adalahStatusReview(e.target.value)) {
              setStatusReview(e.target.value);
              setError("");
            }
          }}
        >
          <option value="belum">Belum</option>
          <option value="disetujui">Disetujui</option>
          <option value="revisi">Revisi</option>
        </select>
      </div>

      {perluCatatan && (
        <div className={styles.field}>
          <label htmlFor="catatan-review">
            Catatan mentor <span aria-hidden="true">*</span>
          </label>

          <textarea
            id="catatan-review"
            value={catatan}
            onChange={(e) => {
              setCatatan(e.target.value);
              setError("");
            }}
            placeholder="Tuliskan catatan review..."
            minLength={5}
            maxLength={1000}
            rows={4}
            required
          />

          <small>{catatan.length}/1000 karakter</small>
        </div>
      )}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit">Simpan review</Button>
        <Button type="button" variant="secondary" onClick={onBatal}>
          Batal
        </Button>
      </div>
    </form>
  );
}