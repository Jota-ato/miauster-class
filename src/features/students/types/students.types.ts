import { students } from "@/db/schema";

export type Student = typeof students.$inferSelect
export type NewStudent = typeof students.$inferInsert
export type UpdateStudent = Partial<Omit<Student, "id">>