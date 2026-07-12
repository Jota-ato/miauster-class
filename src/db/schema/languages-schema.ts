import {
    pgTable,
    uuid,
    varchar,
    boolean
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { languagesLevels } from "./languages-levels-schema"
import { groups } from "./groups-schema"

export const languages = pgTable("languages", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    name: varchar("name", { length: 20 })
        .notNull()
        .unique(),
    isActive: boolean("is_active")
        .notNull()
        .default(true)
})

export const languagesRelations = relations(languages, ({ many }) => ({
    levels: many(languagesLevels),
    groups: many(groups)
}))