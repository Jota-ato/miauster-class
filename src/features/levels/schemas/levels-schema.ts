import { z } from "zod";

export const levelsSchema = z.object({
    name: z.string({ error: "El nombre del nivel es requerido" }).min(1, { error: "El nombre del nivel es requerido" }),
    description: z.string().nullable(),
    isActive: z.boolean().nullable()
})

export type LevelsInput = z.infer<typeof levelsSchema>