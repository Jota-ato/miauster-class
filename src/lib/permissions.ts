import { createAccessControl } from "better-auth/plugins/access";


export const statement = {
    user: ["create", "list", "set-role", "ban", "delete"],
    groups: ["create", "update", "delete", "view"]
} as const;

export const ac = createAccessControl(statement);

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