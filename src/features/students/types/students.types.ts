import { students } from "@/db/schema";

export type Student = typeof students.$inferSelect
export type NewStudent = typeof students.$inferInsert
