import {
    pgTable,
    uuid,
    varchar,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { languagesLevels } from "./languages-levels-schema"

export const levels = pgTable("levels", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    name: varchar("name", { length: 20 })
        .notNull()
        .unique(),
})

export const levelsRelations = relations(levels, ({ many }) => ({
    languagesLevels: many(languagesLevels)
}))