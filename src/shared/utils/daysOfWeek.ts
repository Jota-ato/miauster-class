import { daysOfWeekEnum } from "@/db/schema";

export type DaysOfWeek = (typeof daysOfWeekEnum.enumValues)[number];
export const translatedDaysOfWeek: Record<DaysOfWeek, string> = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
};
