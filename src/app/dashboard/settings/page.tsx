
import { DangerActionsCard } from "@/features/users/components/danger-actions-card"
import { EditOwnUserCard } from "@/features/users/components/edit-own-user-card"
import { PreferencesCard } from "@/features/users/components/preferences-card"
import { User } from "@/features/users/types/user.types"
import { requireAuth } from "@/lib/auth-server"
import { Heading } from "@/shared/components/typography/heading"

import { redirect } from "next/navigation"

export default async function SettingsPage() {

    const { session } = await requireAuth()

    if (!session) redirect("/auth/sign-in")
    const { user } = session

    return (
        <>
            <Heading>
                Configuración
            </Heading>

            <EditOwnUserCard
                user={user as User}
            />
            <PreferencesCard />
            <DangerActionsCard
                user={user as User}
            />
        </>
    )
}