export function adalahKunci<T extends object>(
  contoh: T,
  kunci: string
): kunci is Extract<keyof T, string> {
  return Object.keys(contoh).includes(kunci);
}