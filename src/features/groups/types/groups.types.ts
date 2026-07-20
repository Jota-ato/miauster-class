import { groups, groupsSchedules } from "@/db/schema";
import { Language } from "@/features/languages/types/languages.types";
import { Level } from "@/features/levels/types/levels.types";

export type NewGroup = typeof groups.$inferInsert
export type Group = typeof groups.$inferSelect
export type NewGroupSchedule = typeof groupsSchedules.$inferInsert
export type GroupSchedule = typeof groupsSchedules.$inferSelect

export type DetailedGroup = Group & {
    schedules: GroupSchedule[],
    languageLevel: {
        language: Language,
        level: Level
    }
}