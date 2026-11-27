
import { BASE_URL } from "../config";
import { ApiError, bacaErrorBody } from "./errors";
import type { RefreshResponse } from "./types";

const LINTAS_ORIGIN = BASE_URL.startsWith("http");

type Metode = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type NilaiQuery = string | number | boolean | undefined;

interface OpsiRequest {
  body?: unknown;
  query?: Record<string, NilaiQuery>;
  signal?: AbortSignal;
}

// Token sementara di memori.
let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

function buatUrl(
  path: string,
  query?: Record<string, NilaiQuery>
): string {
  const url = new URL(BASE_URL + path, window.location.origin);

  for (const [kunci, nilai] of Object.entries(query ?? {})) {
    if (nilai !== undefined) {
      url.searchParams.set(kunci, String(nilai));
    }
  }

  return url.toString();
}

export async function request<T>(
  metode: Metode,
  path: string,
  opsi: OpsiRequest = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json, */*",
  };

  if (opsi.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken !== null) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  // 1. Kirim permintaan
  let res: Response;

  try {
    res = await fetch(buatUrl(path, opsi.query), {
      method: metode,
      headers,
      body:
        opsi.body !== undefined
          ? JSON.stringify(opsi.body)
          : undefined,
      signal: opsi.signal,
      credentials: LINTAS_ORIGIN ? "include" : "same-origin",
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }

    throw new ApiError(
      "Tidak dapat terhubung ke server",
      0,
      "NETWORK_ERROR"
    );
  }

  // 2. Baca response sebagai teks
  const requestId = res.headers.get("X-Request-Id") ?? undefined;
  const teks = await res.text();

  let json: unknown = null;

  if (teks !== "") {
    try {
      json = JSON.parse(teks);
    } catch {
      json = null;
    }
  }

  // 3. Tangani response error
  if (!res.ok) {
    const info = bacaErrorBody(json);

    throw new ApiError(
      info?.pesan ?? "Respons server tidak dikenali",
      res.status,
      info?.kode ?? "BAD_RESPONSE",
      info?.detail ?? [],
      info?.requestId ?? requestId
    );
  }

  // 4. Tangani response sukses tanpa body
  if (res.status === 204) {
    return undefined as T;
  }

  // 5. Pastikan response sukses berisi JSON
  if (json === null) {
    throw new ApiError(
      "Server tidak mengirim JSON yang valid",
      res.status,
      "BAD_RESPONSE",
      [],
      requestId
    );
  }

  return json as T;
}

// ---- Sesi ----
let handlerSesiBerakhir: (() => void) | null = null;

export function setSesiBerakhirHandler(
  handler: (() => void) | null
): void {
  handlerSesiBerakhir = handler;
}

// Dipakai penyegaran otomatis (Kamis). Hari ini hanya disiapkan.
export function beritahuSesiBerakhir(): void {
  handlerSesiBerakhir?.();
}

// Cookie refreshToken ikut terkirim otomatis oleh browser.
export async function refreshSekali(): Promise<string> {
  const body = await request<RefreshResponse>("POST", "/auth/refresh");
  setAccessToken(body.data.accessToken);
  return body.data.accessToken;
}
