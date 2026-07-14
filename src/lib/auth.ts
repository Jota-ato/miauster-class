import 'dotenv/config'
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { admin } from "better-auth/plugins";
import { ac, roles } from "./permissions"
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    user: {
        additionalFields: {
            phone: {
                type: "string",
                required: false
            }
        }
    },
    plugins: [
        admin({
            adminRoles: ["admin"],
            ac,
            roles,
            defaultRole: "waiting"
        }),
        nextCookies()
    ]
});