export function convertDateToTime(date: string) {
  const d = new Date(date);
  return d.getTime();
}
