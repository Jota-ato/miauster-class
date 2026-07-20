export function formatTime(timeStr: string): string {
  const [hourStr, minuteStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute =
    minute > 0 ? `:${minute.toString().padStart(2, "0")}` : "";

  return `${displayHour}${displayMinute}${ampm}`;
}
