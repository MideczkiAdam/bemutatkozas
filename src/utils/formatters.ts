export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("hu-HU").format(price) + " Ft";
}
