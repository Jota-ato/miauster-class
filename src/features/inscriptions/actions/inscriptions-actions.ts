"use server";

import { sellerAction } from "@/shared/lib/actions";
import {
  InscriptionInput,
  inscriptionSchema,
} from "../schemas/inscription-schemas";
import { AppError } from "@/shared/lib/errors";
import { inscriptionService } from "../services/inscriptions-service";

export const createInscriptionAction = sellerAction(
  async (data: InscriptionInput, userId: string) => {
    const zodResponse = inscriptionSchema.safeParse(data);

    if (!zodResponse.success) throw new AppError("Datos no válidos");

    await inscriptionService.createInscription(data, userId);
    return "Inscripción creada exitosamente";
  },
);

export const updateInscriptionAction = sellerAction(
  async (id: string, data: InscriptionInput, userId: string) => {
    const zodResponse = inscriptionSchema.safeParse(data);

    if (!zodResponse.success) throw new AppError("Datos no válidos");

    await inscriptionService.updateInscription(id, data, userId);
    return "Inscripción actualizada exitosamente";
  },
);
