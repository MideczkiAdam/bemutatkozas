export function createLocalDateTime(
  date: string,
  time: string
): Date | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);

  if (!dateMatch || !timeMatch) {
    return null;
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);

  const result = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
    0,
    0
  );

  // Ellenőrizzük, hogy valóban a kért dátum jött-e létre.
  if (
    result.getFullYear() !== year ||
    result.getMonth() !== month - 1 ||
    result.getDate() !== day ||
    result.getHours() !== hours ||
    result.getMinutes() !== minutes
  ) {
    return null;
  }

  return result;
}

export function addMinutes(
  date: Date,
  minutes: number
): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

/**
 * Helyi dátum és idő szöveges formátuma.
 * Példa: 2026-11-16T09:30:00
 *
 * Nem alakítjuk UTC-re, nincs Z vagy időzóna-eltolás.
 */
export function toLocalDateTimeString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function getDayOfWeek(date: string): number | null {
  const dateTime = createLocalDateTime(date, "12:00");

  return dateTime?.getDay() ?? null;
}