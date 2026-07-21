import { languagesService } from "@/features/languages/services/languages-service"
import { AddLanguageToLevelDialog } from "@/features/levels/components/edit-language-to-level-dialog"
import { EditLevelCard } from "@/features/levels/components/forms-cards"
import { LevelDetailsCard } from "@/features/levels/components/level-details-card"
import { LevelLanguagesCard } from "@/features/levels/components/level-languages-card"
import { LevelToggleCards } from "@/features/levels/components/level-toggle-cards"
import { levelsService } from "@/features/levels/services/levels-service"
import { UsersPolicies } from "@/features/users/policies/user-policies"
import { requireAuth } from "@/lib/auth-server"
import { Heading } from "@/shared/components/typography/heading"
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
    const currentLanguagesInLevel = await languagesService.getLanguagesByLevel(level.id)
    const languages = await languagesService.getAllLanguages()

    return (
        <>
            <Heading>Nivel: {level.name}</Heading>

            {UsersPolicies.isAdmin(user) ? (
                <LevelToggleCards 
                    level={level}
                />
            ) : (
                <LevelDetailsCard 
                    level={level}
                />
            )}

            <LevelLanguagesCard 
                level={level}
                currentLanguagesInLevel={currentLanguagesInLevel}
                isAdmin={UsersPolicies.isAdmin(user)}
            />
            <AddLanguageToLevelDialog 
                level={level}
                currentLanguagesInLevel={currentLanguagesInLevel}
                languages={languages}
            />
        </>
    )
}