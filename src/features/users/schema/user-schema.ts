import { roles } from "@/db/schema"
import { z } from "zod"

export const userRoles = z.enum(roles.enumValues)
export type UserRole = z.infer<typeof userRoles>

export const userSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    phone: z.string({error: "El teléfono es obligatorio"}).min(10, "El teléfono debe tener al menos 10 dígitos"),
    image: z.url().nullable(),
    role: userRoles
})

export type UserInput = z.infer<typeof userSchema>