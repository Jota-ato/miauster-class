import { z } from "zod";

const baseInscriptionSchema = z.object({
  studentId: z.uuid({ message: "El estudiante es requerido" }),
  studentName: z.string().min(1, { message: "El nombre del estudiante es requerido" }),
  invoiceImage: z.url({ message: "La imagen del comprobante de pago es requerida" }),
});

export const inscriptionSchema = z.discriminatedUnion("levelTest", [
    baseInscriptionSchema.extend({
        levelTest: z.literal(true),
        testPrice: z.number().min(1, { message: "El precio del examen es requerido" }),
    }),
    baseInscriptionSchema.extend({
        levelTest: z.literal(false),
        groupId: z.string().min(1, { message: "El grupo es requerido" }),
    }),
]
)

export type InscriptionInput = z.infer<typeof inscriptionSchema>;
