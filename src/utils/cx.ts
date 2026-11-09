export function cx(...kelas: Array<string | false | null | undefined>): string {
  return kelas.filter(Boolean).join(" ");
}
// cx("a", false, "b") menghasilkan "a b"