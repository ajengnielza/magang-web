export interface Peserta {
  id?: number;
  nama?: string;
  sekolah?: string;
  email?: string;
  fase?: number | string;
  status?: "aktif" | "lulus" | "berhenti" | string;
  role?: "peserta" | "mentor" | string;
}