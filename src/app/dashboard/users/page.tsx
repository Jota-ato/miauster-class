import { UsersTable } from "@/features/users/components/users-table";
import { usersService } from "@/features/users/services/users-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { redirect } from "next/navigation";

export default async function UsersPage() {

    const { session, isAdmin } = await requireAuth()

    if (!session) redirect("/auth/sign-in")
    if (!isAdmin) redirect("/not-authorized")

    const users = await usersService.findAllUsers()

    return (
        <>
            <Heading level={2}>
                Usuarios
            </Heading>

            <UsersTable
                users={users}
            />
        </>
    )
}