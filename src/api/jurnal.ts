
import { request } from "./client";
import type {
  JurnalBaru,
  JurnalListResponse,
  JurnalResponse,
} from "./types";

interface OpsiDaftar {
  halaman?: number;
  batas?: number;
  signal?: AbortSignal;
}

// Mengambil semua jurnal (khusus mentor)
export async function ambilSemuaJurnal({
  halaman,
  batas = 5,
  signal,
}: OpsiDaftar = {}) {
  const body = await request<JurnalListResponse>("GET", "/jurnal", {
    query: { page: halaman, limit: batas },
    signal,
  });

  return {
    daftar: body.data,
    meta: body.meta,
  };
}

// Mengambil jurnal milik peserta yang sedang login dengan pagination
export async function ambilJurnalSaya({
  halaman,
  batas = 5,
  signal,
}: OpsiDaftar = {}) {
  const body = await request<JurnalListResponse>("GET", "/me/jurnal", {
    query: { page: halaman, limit: batas },
    signal,
  });

  return {
    daftar: body.data,
    meta: body.meta,
  };
}

// Membuat jurnal baru
export async function buatJurnal(data: JurnalBaru) {
  const body = await request<JurnalResponse>("POST", "/jurnal", {
    body: data,
  });

  return body.data;
}

export async function hapusJurnal(id: number) {
  await request<void>("DELETE", `/jurnal/${id}`);
}

// Mengambil satu jurnal berdasarkan ID
export async function ambilJurnal(
  id: number,
  { signal }: { signal?: AbortSignal } = {},
) {
  const body = await request<JurnalResponse>("GET", `/jurnal/${id}`, {
    signal,
  });

  return body.data;
}