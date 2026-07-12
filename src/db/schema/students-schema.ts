import {
    pgTable,
    uuid,
    varchar,
    boolean,
    timestamp
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { studentsGroups } from "./students-groups-schema"

export const students = pgTable("students", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    name: varchar("name", { length: 50 })
        .notNull(),
    isActive: boolean("is_active")
        .notNull()
        .default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const studentsRelations = relations(students, ({ many }) => ({
    groups: many(studentsGroups)
}))