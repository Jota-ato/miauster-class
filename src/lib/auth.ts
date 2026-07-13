import 'dotenv/config'
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";

const statement = {
    user: ["create", "list", "set-role", "ban", "delete"],
    groups: ["create", "update", "delete", "view"]
} as const;

const ac = createAccessControl(statement);

export const roles = {
    admin: ac.newRole({
        user: ["create", "list", "set-role", "ban", "delete"],
        groups: ["create", "update", "delete", "view"]
    }),
    seller: ac.newRole({
        groups: ["view"]
    }),
    waiting: ac.newRole({})
};

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
    plugins: [
        admin({
            adminRoles: ["admin"],
            ac,
            roles,
            defaultRole: "waiting"
        })
    ]
});