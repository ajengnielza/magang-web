export function formatTanggal(iso: string): string {
  const tanggal = new Date(iso);
  if (Number.isNaN(tanggal.getTime())) return "-";

  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
// formatTanggal("2026-10-26T03:15:00.000Z") menghasilkan "26 Oktober 2026"