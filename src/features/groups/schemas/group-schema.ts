import { daysOfWeekEnum } from "@/db/schema";
import { z } from "zod";

export const daysOfWeek = z.enum(daysOfWeekEnum.enumValues);
const slotSchema = z.object({
  day: daysOfWeek,
  startTime: z.string().min(1, { error: "Inicio requerido" }),
  endTime: z.string().min(1, { error: "Fin requerido" }),
});

const baseGroupSchema = z.object({
  name: z
    .string()
    .min(1, { error: "El nombre del grupo es requerido" })
    .max(50, {
      error: "El nombre del grupo no puede exceder los 50 caracteres",
    }),
  maxStudents: z
    .number()
    .min(1, { error: "El número máximo de estudiantes debe ser al menos 1" }),
  weeklyPrice: z
    .number()
    .min(0, { error: "El precio semanal debe ser al menos 0" }),
  languageLevelId: z.uuid({ error: "El nivel de idioma es requerido" }),
  particular: z.boolean(),
  isActive: z.boolean(),
  startDate: z.date({ error: "La fecha de inicio es requerida" }),
  endDate: z.date({ error: "La fecha de finalización es requerida" }),
});

// 2. Definición por discriminación
export const groupSchema = z.discriminatedUnion("regularSchedule", [
  baseGroupSchema.extend({
    regularSchedule: z.literal(true),
    startTime: z.string().min(1, { error: "La hora de inicio es requerida" }),
    endTime: z
      .string()
      .min(1, { error: "La hora de finalización es requerida" }),
  }),

  // Caso: Horario Irregular / Personalizado
  baseGroupSchema.extend({
    regularSchedule: z.literal(false),
    slots: z
      .array(slotSchema)
      .min(1, { error: "Debes agregar al menos un horario" }),
  }),
]);

export type GroupInput = z.infer<typeof groupSchema>;
export type SlotInput = z.infer<typeof slotSchema>;