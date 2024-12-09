export function IsoToDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString();
}
