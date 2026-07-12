import {
    pgTable,
    uuid,
    varchar,
    boolean
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
})

export const studentsRelations = relations(students, ({ many }) => ({
    classes: many(studentsGroups)
}))