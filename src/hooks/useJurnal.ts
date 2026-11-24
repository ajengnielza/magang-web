import { useCallback, useEffect, useState } from "react";
import { keApiError } from "../api/errors";
import type { ApiError } from "../api/errors";
import { ambilJurnal } from "../api/jurnal";
import type { Jurnal } from "../api/types";
import type { StatusPermintaan } from "./statusPermintaan";

type Selesai =
  | { kunci: string; status: "berhasil"; data: Jurnal }
  | { kunci: string; status: "gagal"; error: ApiError };

export function useJurnal(id: number) {
  const [versi, setVersi] = useState(0);
  const [selesai, setSelesai] = useState<Selesai | null>(null);

  const kunci = `${id}:${versi}`;

  useEffect(() => {
    const pengendali = new AbortController();
    const kunciPermintaan = `${id}:${versi}`;

    ambilJurnal(id, { signal: pengendali.signal })
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
  }, [id, versi]);

  const hasil: StatusPermintaan<Jurnal> =
    selesai !== null && selesai.kunci === kunci
      ? selesai
      : { status: "memuat" };

  const muatUlang = useCallback(() => {
    setVersi((v) => v + 1);
  }, []);

  return { hasil, muatUlang };
}