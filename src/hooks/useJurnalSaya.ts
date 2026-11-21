
import { useCallback, useEffect, useState } from "react";
import { keApiError } from "../api/errors";
import type { ApiError } from "../api/errors";
import { ambilJurnalSaya } from "../api/jurnal";
import type { StatusPermintaan } from "./statusPermintaan";

type HasilJurnal = Awaited<ReturnType<typeof ambilJurnalSaya>>;

// Hasil yang sudah selesai, ditandai dengan kunci permintaannya
type Selesai =
  | { kunci: string; status: "berhasil"; data: HasilJurnal }
  | { kunci: string; status: "gagal"; error: ApiError };

export function useJurnalSaya(halaman: number) {
  // versi: dinaikkan untuk menjalankan ulang permintaan saat tombol Coba Lagi ditekan
  const [versi, setVersi] = useState(0);

  const [selesai, setSelesai] = useState<Selesai | null>(null);

  // kunci: membedakan hasil permintaan berdasarkan halaman dan versi
  const kunci = `${halaman}:${versi}`;

  useEffect(() => {
    // AbortController: membatalkan permintaan lama yang sudah tidak diperlukan
    const pengendali = new AbortController();

    ambilJurnalSaya({ halaman, signal: pengendali.signal })
      .then((data) => {
        setSelesai({ kunci, status: "berhasil", data });
      })
      .catch((err: unknown) => {
        // signal.aborted: mencegah pembatalan sengaja dianggap sebagai kegagalan
        if (pengendali.signal.aborted) return;

        setSelesai({
          kunci,
          status: "gagal",
          error: keApiError(err),
        });
      });

    // Cleanup: membatalkan permintaan ketika halaman berubah atau komponen dilepas
    return () => pengendali.abort();
  }, [halaman, kunci]);

  // Status turunan: menentukan status dari hasil yang cocok dengan kunci saat ini
  const hasil: StatusPermintaan<HasilJurnal> =
    selesai !== null && selesai.kunci === kunci
      ? selesai
      : { status: "memuat" };

  const muatUlang = useCallback(() => {
    setVersi((v) => v + 1);
  }, []);

  return { hasil, muatUlang };
}
