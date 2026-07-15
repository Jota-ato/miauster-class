import { db } from "@/db"
import { Language, NewLanguage } from "../types/languages.types"
import { languages } from "@/db/schema/languages-schema"

export interface ILanguagesRepository {
    getAll(): Promise<Language[]>
    getById(id: string): Promise<Language | null>
    insert(data: NewLanguage): Promise<void>
}

class LanguagesRepository implements ILanguagesRepository {
    async getAll(): Promise<Language[]> {
        return await db
            .query
            .languages
            .findMany({

            })
    }

    async getById(id: string): Promise<Language | null> {
        return await db
            .query
            .languages
            .findFirst({
                where: (languages, { eq }) => eq(languages.id, id)
            }) || null
    }

    async insert(data: NewLanguage): Promise<void> {
        await db
            .insert(languages)
            .values(data)
    }
}

export const languagesRepository = new LanguagesRepository()