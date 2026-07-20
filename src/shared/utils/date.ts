import { differenceInCalendarDays } from "date-fns";

export function getGroupStartMessage(startDate: Date | string): string {
  const dateToCompare = typeof startDate === "string" ? new Date(startDate) : startDate;
  const daysLeft = differenceInCalendarDays(dateToCompare, new Date());

  if (daysLeft > 1) {
    return `inicia en ${daysLeft} días`;
  }
  if (daysLeft === 1) {
    return "inicia mañana";
  }
  return "inicia hoy";
}