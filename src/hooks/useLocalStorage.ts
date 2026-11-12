
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  kunci: string,
  nilaiAwal: T,
  valid: (data: unknown) => data is T
) {
  const [nilai, setNilai] = useState<T>(() => {
    // Membaca data dari localStorage saat inisialisasi
    try {
      const tersimpan = localStorage.getItem(kunci);

      if (tersimpan === null) return nilaiAwal;

      const data: unknown = JSON.parse(tersimpan);

      return valid(data) ? data : nilaiAwal;
    } catch {
      return nilaiAwal;
    }
  });

  // Menyimpan data setiap nilai berubah
  useEffect(() => {
    try {
      localStorage.setItem(kunci, JSON.stringify(nilai));
    } catch {
      // Abaikan jika penyimpanan penuh atau diblokir
    }
  }, [kunci, nilai]);

  return [nilai, setNilai] as const;
}
