import { z } from "zod";

export const groupSchema = z.object({
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

export type GroupInput = z.infer<typeof groupSchema>;
