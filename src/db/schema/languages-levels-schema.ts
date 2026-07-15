import {
    pgTable,
    uuid,
    boolean,
    timestamp
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { languages } from "./languages-schema"
import { levels } from "./levels-schema"
import { groups } from "./groups-schema"

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
        .default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const languagesLevelsRelations = relations(languagesLevels, ({ one, many }) => ({
    language: one(languages, {
        fields: [languagesLevels.languageId],
        references: [languages.id]
    }),
    level: one(levels, {
        fields: [languagesLevels.levelId],
        references: [levels.id]
    }),
    groups: many(groups)
}))