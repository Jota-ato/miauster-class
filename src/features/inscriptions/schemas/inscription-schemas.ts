import { z } from "zod";

export const inscriptionSchema = z.object({
  groupId: z.uuid({ error: "El grupo es requerido" }),
  studentId: z.uuid({ error: "El estudiante es requerido" }),
  studentName: z
    .string()
    .min(1, { error: "El nombre del estudiante es requerido" }),
  extraPrice: z.number(),
  invoiceImage: z.url({
    error: "La imagen del comprobante de pago es requerida",
  }),
});

export type InscriptionInput = z.infer<typeof inscriptionSchema>;
