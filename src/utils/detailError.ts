
import type { FieldError } from "../api/types";
import type { FormJurnalErrors } from "./validasiJurnal";

export function detailKeErrors(
  detail: readonly FieldError[]
): {
  kolom: FormJurnalErrors;
  umum: string[];
} {
  const kolom: FormJurnalErrors = {};
  const umum: string[] = [];

  for (const d of detail) {
    if (
      d.field === "kegiatan" ||
      d.field === "hambatan" ||
      d.field === "linkCommit"
    ) {
      kolom[d.field] = d.pesan;
    } else {
      umum.push(`${d.field}: ${d.pesan}`);
    }
  }

  return { kolom, umum };
}
