import { EditLevelCard } from "@/features/levels/components/edit-level-card"
import { LevelDetailsCard } from "@/features/levels/components/level-details-card"
import { levelsService } from "@/features/levels/services/levels-service"
import { UsersPolicies } from "@/features/users/policies/user-policies"
import { requireAuth } from "@/lib/auth-server"
import { Heading } from "@/shared/components/typography/heading"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card"
import { notFound, redirect } from "next/navigation"

export default async function LevelPage({
    params
}: {
    params: Promise<{ levelId: string }>
}) {

    const { session, user } = await requireAuth()
    if (!session || !user) redirect("/auth/sign-in")

    const { levelId } = await params

    const level = await levelsService.getLevelById(levelId)
    if (!level) notFound()

    return (
        <>
            <Heading>{level.name}</Heading>

            {UsersPolicies.isAdmin(user) ? (
                <EditLevelCard 
                    level={level}
                />
            ) : (
                <LevelDetailsCard 
                    level={level}
                />
            )}
        </>
    )
}