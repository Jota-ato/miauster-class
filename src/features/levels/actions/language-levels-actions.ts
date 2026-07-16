"use server"

import { adminAction } from "@/shared/lib/actions"
import { LanguageLevelInput, languageLevelSchema } from "../schemas/language-level-schema"
import { AppError } from "@/shared/lib/errors"
import { languageLevelService } from "../services/language-level-service"

export const updateLanguageLevelsAction = adminAction(async (data: LanguageLevelInput, levelId: string) => {
    const zodResult = languageLevelSchema.safeParse(data)

    if (!zodResult.success) {
        throw new AppError("Datos inválidos")
    }

    await languageLevelService.updateLanguagesInLevel(levelId, data.languages)

    return "Idiomas actualizados en el nivel correctamente"
})