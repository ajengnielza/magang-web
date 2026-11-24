
export function bacaBilanganPositif(
  teks: string | null | undefined,
  maks: number
): number | null {
  if (teks === null || teks === undefined) return null;
  if (!/^[1-9]\d*$/.test(teks)) return null;

  const nilai = Number(teks);
  return Number.isSafeInteger(nilai) && nilai <= maks ? nilai : null;
}

export function bacaId(teks: string | null | undefined): number | null {
  return bacaBilanganPositif(teks, 2147483647);
}

export function bacaHalaman(teks: string | null): number {
  return bacaBilanganPositif(teks, 1000000) ?? 1;
}
