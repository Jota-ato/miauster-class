import { z } from "zod";


export const inscriptionSchema = z.object({
    groupId: z.uuid({error: "El grupo es requerido"}),
    studentId: z.uuid({error: "El estudiante es requerido"}),
    extraPrice: z.number()
})

export type InscriptionInput = z.infer<typeof inscriptionSchema>