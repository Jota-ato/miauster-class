import { z } from "zod"

export const baseLanguageSchema = z.object({
    name: z.string().min(1, { message: "El nombre del idioma es requerido" }),
    isActive: z.boolean()
})