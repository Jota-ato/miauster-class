import 'dotenv/config'
import { createAuthClient } from "better-auth/client"
import { adminClient } from "better-auth/client/plugins"
import { roles } from "@/lib/permissions"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [adminClient({
        roles
    })]
})

export const { signOut } = authClient