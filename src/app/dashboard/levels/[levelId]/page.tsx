import { AddLevelCard } from "@/features/levels/components/add-level-card"
import { LevelForm } from "@/features/levels/components/level-form"
import { levelsService } from "@/features/levels/services/levels-service"
import { requireAuth } from "@/lib/auth-server"
import { Heading } from "@/shared/components/typography/heading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
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

            <Card>
                <CardHeader>
                    <CardTitle>Editar nivel</CardTitle>
                    <CardDescription>Modifica los detalles del nivel</CardDescription>
                </CardHeader>
                <CardContent>
                    <LevelForm
                        level={level}
                    />
                </CardContent>
            </Card>
        </>
    )
}