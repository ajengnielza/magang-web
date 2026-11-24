
import { useCallback, useEffect, useState } from "react";
import { keApiError } from "../api/errors";
import type { ApiError } from "../api/errors";
import { ambilJurnalSaya } from "../api/jurnal";
import type { StatusPermintaan } from "./statusPermintaan";

type HasilJurnal = Awaited<ReturnType<typeof ambilJurnalSaya>>;

type Selesai =
  | { kunci: string; status: "berhasil"; data: HasilJurnal }
  | { kunci: string; status: "gagal"; error: ApiError };

export function useJurnalSaya(halaman: number) {
  const [versi, setVersi] = useState(0);
  const [selesai, setSelesai] = useState<Selesai | null>(null);

  const kunci = `${halaman}:${versi}`;

  useEffect(() => {
    const pengendali = new AbortController();
    const kunciPermintaan = `${halaman}:${versi}`;

    ambilJurnalSaya({
      halaman,
      signal: pengendali.signal,
    })
      .then((data) => {
        setSelesai({
          kunci: kunciPermintaan,
          status: "berhasil",
          data,
        });
      })
      .catch((err: unknown) => {
        if (pengendali.signal.aborted) return;

        setSelesai({
          kunci: kunciPermintaan,
          status: "gagal",
          error: keApiError(err),
        });
      });

    return () => pengendali.abort();
  }, [halaman, versi]);

  const hasil: StatusPermintaan<HasilJurnal> =
    selesai !== null && selesai.kunci === kunci
      ? selesai
      : { status: "memuat" };

  const muatUlang = useCallback(() => {
    setVersi((v) => v + 1);
  }, []);

  return { hasil, muatUlang };
}
