import type { Jurnal } from "../types/jurnal";

export const jurnalTiruan: Jurnal[] = [
  {
    id: 1,
    pesertaId: 1,
    reviewerId: null,
    kegiatan: "Mempelajari dasar React dan TypeScript",
    hambatan: null,
    linkCommit: null,
    statusReview: "belum",
    catatanMentor: null,
    lampiran: [],
    createdAt: "2026-10-26T03:15:00.000Z",
  },
  {
    id: 2,
    pesertaId: 1,
    reviewerId: 2,
    kegiatan: "Membuat komponen daftar peserta",
    hambatan: "Masih kesulitan memahami penggunaan props",
    linkCommit: "https://github.com/contoh/repo/commit/abc123",
    statusReview: "revisi",
    catatanMentor: "Perbaiki tipe data props",
    lampiran: [
      {
        url: "/images/daftar-peserta.png",
        keterangan: "Tampilan daftar peserta",
      },
    ],
    createdAt: "2026-10-27T03:15:00.000Z",
  },
  {
    id: 3,
    pesertaId: 1,
    reviewerId: 2,
    kegiatan: "Menerapkan conditional rendering",
    hambatan: "",
    linkCommit: null,
    statusReview: "disetujui",
    catatanMentor: null,
    lampiran: null,
    createdAt: "2026-10-28T03:15:00.000Z",
  },
];