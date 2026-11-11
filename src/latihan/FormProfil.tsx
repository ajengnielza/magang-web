
import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import { adalahKunci } from "../utils/form";
import { validasiFormProfil } from "../utils/validasiProfil";
import type {
  FormProfilErrors,
  FormProfilState,
} from "../utils/validasiProfil";

const NILAI_AWAL: FormProfilState = {
  nama: "",
  telepon: "",
};

export default function FormProfil() {
  const [nilai, setNilai] = useState<FormProfilState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormProfilErrors>({});
  const [tersimpan, setTersimpan] = useState<FormProfilState | null>(null);

  const ubah: ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const hasil = validasiFormProfil(nilai);
    setErrors(hasil);

    if (Object.keys(hasil).length > 0) return;

    setTersimpan({
      nama: nilai.nama.trim(),
      telepon: nilai.telepon.trim(),
    });

    setNilai(NILAI_AWAL);
  };

  return (
    <form onSubmit={kirim} noValidate>
      <p>
        <label htmlFor="profil-nama">Nama</label>
        <br />
        <input
          id="profil-nama"
          name="nama"
          autoComplete="name"
          value={nilai.nama}
          onChange={ubah}
          aria-invalid={errors.nama ? true : undefined}
          aria-describedby={
            errors.nama ? "profil-nama-error" : undefined
          }
        />

        {errors.nama && (
          <span id="profil-nama-error" role="alert">
            {" "}
            {errors.nama}
          </span>
        )}
      </p>

      <p>
        <label htmlFor="profil-telepon">Telepon (opsional)</label>
        <br />
        <input
          id="profil-telepon"
          name="telepon"
          type="tel"
          autoComplete="tel"
          value={nilai.telepon}
          onChange={ubah}
          aria-invalid={errors.telepon ? true : undefined}
          aria-describedby={
            errors.telepon ? "profil-telepon-error" : undefined
          }
        />

        {errors.telepon && (
          <span id="profil-telepon-error" role="alert">
            {" "}
            {errors.telepon}
          </span>
        )}
      </p>

      <Button type="submit">Simpan profil</Button>

      {tersimpan && (
        <Alert tipe="sukses">
          Tersimpan: {tersimpan.nama} ·{" "}
          {tersimpan.telepon || "tanpa telepon"}
        </Alert>
      )}
    </form>
  );
}
