import { languages, languagesLevels } from "@/db/schema";
import { Level } from "@/features/levels/types/levels.types";

export type Language = typeof languages.$inferSelect
export type NewLanguage = typeof languages.$inferInsert
export type UpdateLanguage = Partial<Omit<Language, "id">>

export type LanguageLevel = typeof languagesLevels.$inferSelect & {
    level: Level
}

export type LanguageWithLanguagesLevels = Language & {
    languagesLevels: LanguageLevel[]
}