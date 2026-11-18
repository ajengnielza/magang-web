
import type { StatusReview } from "../api/types";

// Tipe khusus UI. Bentuk data dari server ada di src/api/types.ts
export type FilterStatus = "semua" | StatusReview;

export interface ReviewJurnal {
  statusReview: StatusReview;
  catatan: string | null;
}
