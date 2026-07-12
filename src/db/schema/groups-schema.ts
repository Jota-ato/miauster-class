import {
    pgTable,
    uuid,
    varchar,
    integer,
    numeric,
    boolean,
    date
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { languagesLevels, studentsGroups } from "."
import { groupsSchedules } from "./groups-schedules"

export const groups = pgTable("groups", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    name: varchar("name", { length: 20 })
        .notNull(),
    maxStudents: integer("max_students")
        .notNull(),
    weeklyPrice: numeric("weekly_price", { precision: 10, scale: 2 })
        .notNull(),
    languageLevelId: uuid("language_level_id")
        .notNull()
        .references(() => languagesLevels.id, { onDelete: "restrict" }),
    particular: boolean("particular")
        .notNull()
        .default(false),
    startDate:
        date("start_date", { mode: "string" })
            .notNull(),
    endDate: date("end_date", { mode: "string" })
        .notNull()
})

export const groupsRelations = relations(groups, ({ one, many }) => ({
    languageLevel: one(languagesLevels, {
        fields: [groups.languageLevelId],
        references: [languagesLevels.id],
    }),
    studentsGroups: many(studentsGroups),
    schedules: many(groupsSchedules)
}))