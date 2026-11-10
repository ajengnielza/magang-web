
import type { Peserta } from "../types/peserta";

export function tambahPeserta(
  daftar: readonly Peserta[],
  baru: Peserta
): Peserta[] {
  return [...daftar, baru];
}

export function hapusPeserta(
  daftar: readonly Peserta[],
  id: number
): Peserta[] {
  return daftar.filter((p) => p.id !== id);
}

export function gantiPeserta(
  daftar: readonly Peserta[],
  pengganti: Peserta
): Peserta[] {
  return daftar.map((p) =>
    p.id === pengganti.id ? pengganti : p
  );
}

export function ubahFasePeserta(
  daftar: readonly Peserta[],
  id: number,
  fase: number
): Peserta[] {
  return daftar.map((p) =>
    p.id === id ? { ...p, fase } : p
  );
}

export function urutkanPesertaBerdasarkanNama(
  daftar: readonly Peserta[]
): Peserta[] {
  return [...daftar].sort((a, b) =>
    a.nama.localeCompare(b.nama, "id")
  );
}

export function hapusBerdasarkanId<T extends { id: number }>(
  daftar: readonly T[],
  id: number
): T[] {
  return daftar.filter((item) => item.id !== id);
}
