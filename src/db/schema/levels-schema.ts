import {
    pgTable,
    timestamp,
    uuid,
    varchar,
    boolean
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
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const levelsRelations = relations(levels, ({ many }) => ({
    languagesLevels: many(languagesLevels)
}))