import {
    pgTable,
    uuid,
    boolean
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { languages } from "./languages-schema"
import { levels } from "./levels-schema"

export const languagesLevels = pgTable("languages_levels", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    languageId: uuid("language_id")
        .notNull()
        .references(() => languages.id, { onDelete: "cascade" }),
    levelId: uuid("level_id")
        .notNull()
        .references(() => levels.id, { onDelete: "cascade" }),
    isActive: boolean("is_active")
        .notNull()
        .default(true)
})

export const languagesLevelsRelations = relations(languagesLevels, ({ one }) => ({
    language: one(languages, {
        fields: [languagesLevels.languageId],
        references: [languages.id]
    }),
    level: one(levels, {
        fields: [languagesLevels.levelId],
        references: [levels.id]
    }),
}))