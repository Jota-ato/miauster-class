import { roles } from "@/db/schema"
import { z } from "zod"

export const userRoles = z.enum(roles.enumValues)
export type UserRole = z.infer<typeof userRoles>

export const baseUserSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    phone: z.string({error: "El teléfono es obligatorio"}).optional(),
    role: userRoles
})

export const editOwnUserSchema = baseUserSchema.pick({
    name: true,
    phone: true
})

export const editUserSchema = baseUserSchema

export type EditOwnUserInput = z.infer<typeof editOwnUserSchema>
export type EditUserInput = z.infer<typeof editUserSchema>