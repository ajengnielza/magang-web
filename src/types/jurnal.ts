export interface Lampiran {
  url: string;
  keterangan?: string;
}

export interface Jurnal {
  id: number;
  pesertaId: number;
  reviewerId: number | null;
  kegiatan: string;
  hambatan: string | null;
  linkCommit: string | null;
  statusReview: "belum" | "disetujui" | "revisi";
  catatanMentor: string | null;
  lampiran: Lampiran[] | null;
  createdAt: string; // ISO dari JSON, bukan Date
}