"use server";

import { adminAction } from "@/shared/lib/actions";
import { LanguageInput, LanguageLevelInput, languageLevelSchema, languageSchema } from "../schema/languages-schema";
import { AppError } from "@/shared/lib/errors";
import { languagesService } from "../services/languages-service";
import { languageLevelService } from "@/features/levels/services/language-level-service";

export const addLanguageAction = adminAction(async (data: LanguageInput) => {
  const zodResponse = languageSchema.safeParse(data);

  if (!zodResponse.success) {
    throw new AppError("Datos inválidos");
  }

  await languagesService.createLanguage(zodResponse.data);

  return `Idioma ${zodResponse.data.name} agregado correctamente`;
});

export const updateLanguageAction = adminAction(
  async (data: LanguageInput, id: string) => {
    const zodResponse = languageSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Datos inválidos");
    }

    await languagesService.updateLanguage(zodResponse.data, id);

    return `Idioma ${zodResponse.data.name} actualizado correctamente`;
  },
);

export const editLanguageLevelsAction = adminAction(async (languageId: string, data: LanguageLevelInput) => {
  const zodResponse = languageLevelSchema.safeParse(data);

  if (!zodResponse.success) {
    throw new AppError("Datos inválidos");
  }

  await languageLevelService.updateLevelsInLanguage(languageId, zodResponse.data.levelsId);
});
