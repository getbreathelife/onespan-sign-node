export function serializeDate(date: string | Date | undefined): string | undefined {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date;
}
