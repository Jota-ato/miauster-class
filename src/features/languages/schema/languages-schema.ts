import { z } from "zod";

export const languageSchema = z.object({
  name: z.string().min(1, { message: "El nombre del idioma es requerido" }),
  isActive: z.boolean().default(true),
});

export type LanguageInput = z.infer<typeof languageSchema>;
