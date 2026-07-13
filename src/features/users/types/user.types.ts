import { user } from "@/db/schema/auth-schema"

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert