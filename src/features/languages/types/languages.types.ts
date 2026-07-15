import { languages } from "@/db/schema";

export type Language = typeof languages.$inferSelect
export type NewLanguage = typeof languages.$inferInsert
export type UpdateLanguage = Partial<Omit<Language, "id">>