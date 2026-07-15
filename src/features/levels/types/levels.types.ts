import { levels } from "@/db/schema/levels-schema";
import { Language } from "@/features/languages/types/languages.types";

export type Level = typeof levels.$inferSelect
export type LevelWithLanguages = Level & {
    languagesLevels: {
        languages: Language[]
    }
}
export type NewLevel = typeof levels.$inferInsert
export type UpdateLevel = Partial<Omit<Level, "id">>