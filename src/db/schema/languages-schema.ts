import {
    pgTable,
    uuid,
    varchar,
    boolean,
    timestamp
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
        .default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const languagesRelations = relations(languages, ({ many }) => ({
    languagesLevels: many(languagesLevels),
}))