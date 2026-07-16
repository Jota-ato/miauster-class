import { db } from "@/db"
import { Language, LanguageLevelWithLanguage, LanguageWithLanguagesLevels, NewLanguage } from "../types/languages.types"
import { languages } from "@/db/schema/languages-schema"

export interface ILanguagesRepository {
    getAll(full: true): Promise<LanguageWithLanguagesLevels[]>
    getAll(full?: false): Promise<Language[]>
    getAll(full?: boolean): Promise<Language[] | LanguageWithLanguagesLevels[]>
    getAll(): Promise<Language[]>
    getById(id: string): Promise<Language | null>
    getByLevel(levelId: string): Promise<LanguageLevelWithLanguage[]>
    insert(data: NewLanguage): Promise<void>
}

class LanguagesRepository implements ILanguagesRepository {
    async getAll(full: true): Promise<LanguageWithLanguagesLevels[]>
    async getAll(full?: false): Promise<Language[]>
    async getAll(full?: boolean): Promise<Language[] | LanguageWithLanguagesLevels[]> {
        return await db
            .query
            .languages
            .findMany({
                with: {
                    languagesLevels: {
                        with: {
                            level: full ? true : undefined
                        }
                    }
                }
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

    async getByLevel(levelId: string): Promise<LanguageLevelWithLanguage[]> {
        return await db
            .query
            .languagesLevels
            .findMany({
                where: (languagesLevels, { eq }) => eq(languagesLevels.levelId, levelId),
                with: {
                    language: true
                }
            })
    }

    async insert(data: NewLanguage): Promise<void> {
        await db
            .insert(languages)
            .values(data)
    }
}

export const languagesRepository = new LanguagesRepository()