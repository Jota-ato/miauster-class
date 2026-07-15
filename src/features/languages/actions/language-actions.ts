"use server"

import { adminAction } from "@/shared/lib/actions"
import { LanguageInput, languageSchema } from "../schema/languages-schema"
import { AppError } from "@/shared/lib/errors"
import { languagesService } from "../services/languages-service"

export const addLanguageAction = adminAction(async (data: LanguageInput) => {
    const zodResponse = languageSchema.safeParse(data)

    if (!zodResponse.success) {
        throw new AppError("Datos inválidos")
    }

    await languagesService.createLanguage(zodResponse.data)

    return `Idioma ${zodResponse.data.name} agregado correctamente`
})