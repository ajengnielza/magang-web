export function adalahUrlHttp(teks: string): boolean {
  return /^https?:\/\//i.test(teks);
}