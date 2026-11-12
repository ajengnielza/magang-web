
import type {
  FilterStatus,
  Jurnal,
  Lampiran,
  StatusReview,
} from "../types/jurnal";

function adalahObjek(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

const adalahStringAtauNull = (x: unknown): x is string | null =>
  x === null || typeof x === "string";

const adalahAngkaAtauNull = (x: unknown): x is number | null =>
  x === null || typeof x === "number";

export function adalahStatusReview(x: unknown): x is StatusReview {
  return x === "belum" || x === "disetujui" || x === "revisi";
}

export const adalahFilterStatus = (x: string): x is FilterStatus =>
  x === "semua" || adalahStatusReview(x);

function adalahLampiran(x: unknown): x is Lampiran {
  return (
    adalahObjek(x) &&
    typeof x.url === "string" &&
    (x.keterangan === undefined || typeof x.keterangan === "string")
  );
}

export function adalahJurnal(x: unknown): x is Jurnal {
  return (
    adalahObjek(x) &&
    typeof x.id === "number" &&
    typeof x.pesertaId === "number" &&
    adalahAngkaAtauNull(x.reviewerId) &&
    typeof x.kegiatan === "string" &&
    adalahStringAtauNull(x.hambatan) &&
    adalahStringAtauNull(x.linkCommit) &&
    adalahStatusReview(x.statusReview) &&
    adalahStringAtauNull(x.catatanMentor) &&
    (x.lampiran === null ||
      (Array.isArray(x.lampiran) && x.lampiran.every(adalahLampiran))) &&
    typeof x.createdAt === "string"
  );
}

export const adalahDaftarJurnal = (x: unknown): x is Jurnal[] =>
  Array.isArray(x) && x.every(adalahJurnal);
