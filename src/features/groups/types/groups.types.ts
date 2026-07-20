import { groups, groupsSchedules } from "@/db/schema";

export type NewGroup = typeof groups.$inferInsert
export type Group = typeof groups.$inferSelect
export type NewGroupSchedule = typeof groupsSchedules.$inferInsert
export type GroupSchedule = typeof groupsSchedules.$inferSelect