import { groups, groupsSchedules } from "@/db/schema";
import { Language } from "@/features/languages/types/languages.types";
import { Level } from "@/features/levels/types/levels.types";
import { Student } from "@/features/students/types/students.types";

export type NewGroup = typeof groups.$inferInsert
export type Group = typeof groups.$inferSelect
export type UpdateGroup = Partial<Omit<Group, "id">>
export type NewGroupSchedule = typeof groupsSchedules.$inferInsert
export type GroupSchedule = typeof groupsSchedules.$inferSelect

export type DetailedGroup = Group & {
    schedules: GroupSchedule[],
    languageLevel: {
        language: Language,
        level: Level
    },
    leftSpots: number
}

export type FullGroup = DetailedGroup & {
    studentsGroups: {
        student: Student
    }
}