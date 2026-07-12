import {
    pgTable,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { groups } from "./groups-schema"
import { students } from "./students-schema"

export const studentsGroups = pgTable("students_groups", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    studentId: uuid("student_id")
        .notNull()
        .references(() => students.id, { onDelete: "restrict" }),
    groupId: uuid("group_id")
        .notNull()
        .references(() => groups.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const studentsGroupsRelations = relations(studentsGroups, ({ one }) => ({
    student: one(students, {
        fields: [studentsGroups.studentId],
        references: [students.id],
    }),
    group: one(groups, {
        fields: [studentsGroups.groupId],
        references: [groups.id],
    })
}))