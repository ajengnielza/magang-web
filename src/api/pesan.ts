
import type { ApiError } from "./errors";

type Konteks = "umum" | "login";

// Fungsi murni untuk mengubah error menjadi pesan pengguna.
export function pesanUntukPengguna(
  error: ApiError,
  konteks: Konteks = "umum"
): string {
  switch (error.kode) {
    case "NETWORK_ERROR":
      return "Tidak dapat terhubung ke server. Periksa koneksi internetmu lalu coba lagi.";

    case "UNAUTHORIZED":
      return konteks === "login"
        ? "Email atau password salah."
        : "Sesimu berakhir atau kamu belum login. Silakan login kembali.";

    case "TOKEN_EXPIRED":
    case "INVALID_TOKEN":
      return "Sesimu berakhir. Silakan login kembali.";

    case "FORBIDDEN":
      return "Kamu tidak memiliki akses untuk aksi ini.";

    case "NOT_FOUND":
      return "Data yang dicari tidak ditemukan.";

    case "CONFLICT":
      return "Data bentrok dengan data yang sudah ada.";

    case "RATE_LIMITED":
      return "Terlalu banyak percobaan. Tunggu beberapa saat lalu coba lagi.";

    case "PAYLOAD_TOO_LARGE":
      return "Data yang dikirim terlalu besar.";

    case "VALIDATION_ERROR":
      return "Data yang dikirim belum valid. Periksa kembali isianmu.";

    case "INVALID_JSON":
      return "Format data yang dikirim tidak dikenali. Hubungi pengembang jika terus terjadi.";

    case "BAD_RESPONSE":
      return "Server mengirim jawaban yang tidak dikenali. Coba lagi beberapa saat lagi.";

    default:
      return "Terjadi kesalahan di server. Coba lagi beberapa saat lagi.";
  }
}

// Menghasilkan kode laporan jika requestId tersedia.
export function kodeLaporan(error: ApiError): string | null {
  return error.requestId ? `Kode laporan: ${error.requestId}` : null;
}
