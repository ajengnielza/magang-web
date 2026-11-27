
import { refreshSekali, request, setAccessToken } from "./client";
import { ApiError } from "./errors";
import type { LoginResponse, Peserta, PesertaResponse } from "./types";

export async function login(
  email: string,
  password: string
): Promise<Peserta> {
  const body = await request<LoginResponse>("POST", "/auth/login", {
    body: { email, password },
  });

  setAccessToken(body.data.accessToken);
  return body.data.peserta;
}

export async function ambilProfil(): Promise<Peserta> {
  const body = await request<PesertaResponse>("GET", "/me");
  return body.data;
}

export async function logout(): Promise<void> {
  try {
    await request<void>("POST", "/auth/logout");
  } finally {
    setAccessToken(null);
  }
}

// Dipanggil saat aplikasi dibuka: adakah sesi yang masih berlaku?
export async function pulihkanSesi(): Promise<Peserta | null> {
  try {
    await refreshSekali();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return null;
    }
    throw err;
  }

  return ambilProfil();
}
