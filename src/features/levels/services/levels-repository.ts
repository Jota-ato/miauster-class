import { db } from "@/db"
import { Level, LevelWithLanguages, NewLevel, UpdateLevel } from "../types/levels.types"
import { levels } from "@/db/schema"
import { eq } from "drizzle-orm"

export interface ILevelsRepository {
    getAll(full: true): Promise<LevelWithLanguages[]>
    getAll(full?: false): Promise<Level[]>
    getAll(full?: boolean): Promise<Level[] | LevelWithLanguages[]>
    getById(id: string): Promise<Level | null>
    insert(data: NewLevel): Promise<void>
    update(id: string, data: UpdateLevel): Promise<void>
}

class LevelsRepository implements ILevelsRepository {
    async getAll(full: true): Promise<LevelWithLanguages[]>
    async getAll(full?: false): Promise<Level[]>
    async getAll(full: boolean = false): Promise<Level[] | LevelWithLanguages[]> {
        return await db
            .query
            .levels
            .findMany({
                with: {
                    languagesLevels: {
                        with: {
                            language: full ? true : undefined
                        }
                    }
                },
                orderBy: (level, { asc }) => asc(level.name)
            })
    }

    async getById(id: string): Promise<Level | null> {
        return await db
            .query
            .levels
            .findFirst({
                where: (level, { eq }) => eq(level.id, id)
            }) || null
    }

    async insert(data: NewLevel): Promise<void> {
        await db
            .insert(levels)
            .values(data)
    }

    async update(id: string, data: UpdateLevel): Promise<void> {
        await db
            .update(levels)
            .set(data)
            .where(eq(levels.id, id))
    }
}

export const levelsRepository = new LevelsRepository()