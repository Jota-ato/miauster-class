"use server";

import { adminAction } from "@/shared/lib/actions";
import { LevelsInput, levelsSchema } from "../schemas/levels-schema";
import { AppError } from "@/shared/lib/errors";
import { levelsService } from "../services/levels-service";

export const createLevelAction = adminAction(async (data: LevelsInput) => {
  const zodResponse = levelsSchema.safeParse(data);

  if (!zodResponse.success) {
    throw new AppError("Datos inválidos");
  }

  await levelsService.addLevel(zodResponse.data);

  return `Nivel "${zodResponse.data.name}" agregado correctamente`;
});

export const updateLevelAction = adminAction(
  async (levelId: string, data: LevelsInput) => {
    const zodResponse = levelsSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Datos inválidos");
    }

    await levelsService.updateLevel(levelId, zodResponse.data);

    return `Nivel "${zodResponse.data.name}" actualizado correctamente`;
  },
);
