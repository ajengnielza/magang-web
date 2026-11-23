
import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import type { JurnalBaru } from "../../api/types";
import { ApiError, keApiError } from "../../api/errors";
import { adalahKunci } from "../../utils/form";
import { detailKeErrors } from "../../utils/detailError";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type {
  FormJurnalErrors,
  FormJurnalState,
} from "../../utils/validasiJurnal";
import Button from "../ui/Button";
import styles from "./FormJurnal.module.css";

interface FormJurnalProps {
  onTambah: (data: JurnalBaru) => Promise<void>;
}

const NILAI_AWAL: FormJurnalState = {
  kegiatan: "",
  hambatan: "",
  linkCommit: "",
};

export default function FormJurnal({ onTambah }: FormJurnalProps) {
  const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormJurnalErrors>({});
  const [errorUmum, setErrorUmum] = useState<string[]>([]);
  const [menyimpan, setMenyimpan] = useState(false);

  const kegiatanRef = useRef<HTMLTextAreaElement>(null);
  const hambatanRef = useRef<HTMLTextAreaElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
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

    setErrorUmum([]);
  };

  const kirim: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Validasi data di frontend.
    const hasil = validasiFormJurnal(nilai);
    setErrors(hasil);
    setErrorUmum([]);

    if (Object.keys(hasil).length > 0) {
      if (hasil.kegiatan) kegiatanRef.current?.focus();
      else if (hasil.hambatan) hambatanRef.current?.focus();
      else if (hasil.linkCommit) linkRef.current?.focus();
      return;
    }

    setMenyimpan(true);

    try {
      await onTambah({
        kegiatan: nilai.kegiatan.trim(),
        hambatan: nilai.hambatan.trim() || undefined,
        linkCommit: nilai.linkCommit.trim() || undefined,
      });

      // Kosongkan form hanya jika penyimpanan berhasil.
      setNilai(NILAI_AWAL);
      setErrors({});
      setErrorUmum([]);
    } catch (error: unknown) {
      const apiError = keApiError(error);

      if (apiError instanceof ApiError && apiError.status === 422) {
        const hasilPemetaan = detailKeErrors(apiError.detail);

        setErrors(hasilPemetaan.kolom);
        setErrorUmum(hasilPemetaan.umum);

        if (hasilPemetaan.kolom.kegiatan) {
          kegiatanRef.current?.focus();
        } else if (hasilPemetaan.kolom.hambatan) {
          hambatanRef.current?.focus();
        } else if (hasilPemetaan.kolom.linkCommit) {
          linkRef.current?.focus();
        }
      } else {
        setErrorUmum(["Jurnal gagal disimpan. Silakan coba lagi."]);
      }
    } finally {
      setMenyimpan(false);
    }
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

      {errorUmum.length > 0 && (
        <div role="alert" className={styles.error}>
          {errorUmum.map((pesan, index) => (
            <p key={`${index}-${pesan}`}>{pesan}</p>
          ))}
        </div>
      )}

      <div>
        <Button type="submit" disabled={menyimpan}>
          {menyimpan ? "Menyimpan..." : "Simpan jurnal"}
        </Button>
      </div>
    </form>
  );
}
