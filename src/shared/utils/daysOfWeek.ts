import { daysOfWeekEnum } from "@/db/schema";

export const translatedDaysOfWeek: Record<
  (typeof daysOfWeekEnum.enumValues)[number],
  string
> = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
};
