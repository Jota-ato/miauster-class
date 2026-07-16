import { db } from "@/db"
import { languagesLevels } from "@/db/schema"
import { NewLanguageLevel } from "../types/levels.types"
import { eq } from "drizzle-orm"

export interface ILanguageLevelsRepository {
    insert(languages: NewLanguageLevel[]): Promise<void>
    deleteByLevelId(levelId: string): Promise<void>
}

class LanguageLevelsRepository implements ILanguageLevelsRepository {
    async insert(languages: NewLanguageLevel[]): Promise<void> {
        await db
            .insert(languagesLevels)
            .values(languages)
    }

    async deleteByLevelId(levelId: string): Promise<void> {
        await db
            .update(languagesLevels)
            .set({
                isActive: false
            })
            .where(eq(languagesLevels.levelId, levelId))
    }
}

export const languageLevelsRepository = new LanguageLevelsRepository()