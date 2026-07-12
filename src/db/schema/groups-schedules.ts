import {
    pgTable,
    uuid,
    time,
    pgEnum,
    timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { groups } from "./groups-schema";

export const daysOfWeekEnum = pgEnum("days_of_week", [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
]);

export const groupsSchedules = pgTable("groups_schedules", {
    id: uuid("id").defaultRandom().primaryKey(),
    groupId: uuid("group_id")
        .notNull()
        .references(() => groups.id, { onDelete: "cascade" }),
    dayOfWeek: daysOfWeekEnum("day_of_week").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const groupsSchedulesRelations = relations(groupsSchedules, ({ one }) => ({
    group: one(groups, {
        fields: [groupsSchedules.groupId],
        references: [groups.id],
    }),
}));