
import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import type { JurnalBaru } from "../../types/jurnal";
import { adalahKunci } from "../../utils/form";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type {
  FormJurnalErrors,
  FormJurnalState,
} from "../../utils/validasiJurnal";
import Button from "../ui/Button";
import styles from "./FormJurnal.module.css";

interface FormJurnalProps {
  onTambah: (data: JurnalBaru) => void;
}

const NILAI_AWAL: FormJurnalState = {
  kegiatan: "",
  hambatan: "",
  linkCommit: "",
};

export default function FormJurnal({ onTambah }: FormJurnalProps) {
  const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormJurnalErrors>({});

  // Referensi untuk fokus otomatis ke kolom yang error
  const kegiatanRef = useRef<HTMLTextAreaElement>(null);
  const hambatanRef = useRef<HTMLTextAreaElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk mengubah nilai input
  const ubah: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;

    if (!adalahKunci(NILAI_AWAL, name)) return;

    setNilai((sebelumnya) => ({
      ...sebelumnya,
      [name]: value,
    }));

    setErrors((sebelumnya) => ({
      ...sebelumnya,
      [name]: undefined,
    }));
  };

  // Fungsi untuk mengirim form
  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const hasil = validasiFormJurnal(nilai);
    setErrors(hasil);

    // Fokus otomatis ke kolom pertama yang memiliki error
    if (Object.keys(hasil).length > 0) {
      if (hasil.kegiatan) {
        kegiatanRef.current?.focus();
      } else if (hasil.hambatan) {
        hambatanRef.current?.focus();
      } else if (hasil.linkCommit) {
        linkRef.current?.focus();
      }

      return;
    }

    onTambah({
      kegiatan: nilai.kegiatan.trim(),
      hambatan: nilai.hambatan.trim() || null,
      linkCommit: nilai.linkCommit.trim() || null,
    });

    setNilai(NILAI_AWAL);
  };

  return (
    <form className={styles.form} onSubmit={kirim} noValidate>
      <div className={styles.kolom}>
        <label className={styles.label} htmlFor="kegiatan">
          Kegiatan hari ini
        </label>

        <textarea
          ref={kegiatanRef}
          id="kegiatan"
          name="kegiatan"
          rows={3}
          className={styles.input}
          value={nilai.kegiatan}
          onChange={ubah}
          aria-invalid={errors.kegiatan ? true : undefined}
          aria-describedby={errors.kegiatan ? "kegiatan-error" : undefined}
        />

        {errors.kegiatan && (
          <p id="kegiatan-error" role="alert" className={styles.error}>
            {errors.kegiatan}
          </p>
        )}
      </div>

      <div className={styles.kolom}>
        <label className={styles.label} htmlFor="hambatan">
          Hambatan (opsional)
        </label>

        <textarea
          ref={hambatanRef}
          id="hambatan"
          name="hambatan"
          rows={2}
          className={styles.input}
          value={nilai.hambatan}
          onChange={ubah}
          aria-invalid={errors.hambatan ? true : undefined}
          aria-describedby={errors.hambatan ? "hambatan-error" : undefined}
        />

        {errors.hambatan && (
          <p id="hambatan-error" role="alert" className={styles.error}>
            {errors.hambatan}
          </p>
        )}
      </div>

      <div className={styles.kolom}>
        <label className={styles.label} htmlFor="linkCommit">
          Link commit (opsional)
        </label>

        <input
          ref={linkRef}
          id="linkCommit"
          name="linkCommit"
          className={styles.input}
          value={nilai.linkCommit}
          onChange={ubah}
          aria-invalid={errors.linkCommit ? true : undefined}
          aria-describedby={errors.linkCommit ? "linkCommit-error" : undefined}
        />

        {errors.linkCommit && (
          <p id="linkCommit-error" role="alert" className={styles.error}>
            {errors.linkCommit}
          </p>
        )}
      </div>

      <div>
        <Button type="submit">Simpan jurnal</Button>
      </div>
    </form>
  );
}
