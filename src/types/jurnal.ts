export interface Lampiran {
  url: string;
  keterangan?: string;
}
export type StatusReview = "belum" | "disetujui" | "revisi";

export interface Jurnal {
  id: number;
  pesertaId: number;
  reviewerId: number | null;
  kegiatan: string;
  hambatan: string | null;
  linkCommit: string | null;
  statusReview: StatusReview;
  catatanMentor: string | null;
  lampiran: Lampiran[] | null;
  createdAt: string; // ISO dari JSON, bukan Date
}