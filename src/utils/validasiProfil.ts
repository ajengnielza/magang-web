
export interface FormProfilState {
  nama: string;
  telepon: string;
}

export type FormProfilErrors = Partial<
  Record<keyof FormProfilState, string>
>;

const POLA_TELEPON = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;

export function validasiFormProfil(
  nilai: FormProfilState
): FormProfilErrors {
  const errors: FormProfilErrors = {};
  const nama = nilai.nama.trim();
  const telepon = nilai.telepon.trim();

  if (nama.length < 3) {
    errors.nama = "Nama minimal 3 karakter";
  } else if (nama.length > 100) {
    errors.nama = "Nama maksimal 100 karakter";
  }

  if (telepon !== "" && !POLA_TELEPON.test(telepon)) {
    errors.telepon = "Format nomor telepon Indonesia tidak valid";
  }

  return errors;
}
