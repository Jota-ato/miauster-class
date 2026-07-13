import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UsersPolicies } from "@/features/users/policies/user-policies";
import { User } from "@/features/users/types/user.types";

export async function getServerSession() {
    return await auth.api.getSession({
        headers: await headers()
    })
}

export async function requireAuth() {
    const session = await getServerSession()

    if (!session) return {
        session: null,
        isAuth: false,
        isAdmin: false,
        isSeller: false
    }

    return {
        session,
        isAuth: session ? true : false,
        isAdmin: UsersPolicies.isAdmin(session.user as User),
        isSeller: UsersPolicies.isSeller(session.user as User)
    }
}