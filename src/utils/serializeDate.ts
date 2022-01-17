export function serializeDate(date: string | Date | undefined): string | undefined {
  if (date instanceof Date) {
    return date.toISOString();
  }

  if (typeof date === 'string' || typeof date === 'undefined') {
    return date;
  }

  throw new Error('Invalid parameter provided! Expect to be an instance of Date, string or undefined');
}
