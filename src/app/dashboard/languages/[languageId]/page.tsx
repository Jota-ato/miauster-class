import { EditLanguageLevelsDialog } from "@/features/languages/components/edit-language-levels-dialog"
import { EditLanguageCard } from "@/features/languages/components/forms-cards"
import { LanguageDetailsCard } from "@/features/languages/components/language-details-card"
import { LanguageToggleCard } from "@/features/languages/components/language-toggle-card"
import { LanguagesLevelCard } from "@/features/languages/components/languages-level-card"
import { languagesService } from "@/features/languages/services/languages-service"
import { languageLevelService } from "@/features/levels/services/language-level-service"
import { levelsService } from "@/features/levels/services/levels-service"
import { UsersPolicies } from "@/features/users/policies/user-policies"
import { requireAuth } from "@/lib/auth-server"
import { Heading } from "@/shared/components/typography/heading"
import { notFound, redirect } from "next/navigation"

export default async function LanguagePage({
    params
}: {
    params: Promise<{ languageId: string }>
}) {

    const { user } = await requireAuth()

    if (!user) redirect("/auth/sign-in")
    
    const { languageId } = await params
    const language = await languagesService.getLanguageById(languageId)
    if (!language) notFound()
    const levelsOfLanguage = await languageLevelService.getLevelsByLanguage(languageId)
    const levels = await levelsService.getAllLevels()

    return (
        <>
            <Heading>{language.name}</Heading>
            {UsersPolicies.isAdmin(user) ? (
                <LanguageToggleCard 
                    language={language}
                />
            ): (
                <LanguageDetailsCard 
                    language={language}
                />
            )}
            <LanguagesLevelCard 
                language={language}
                levels={levelsOfLanguage}
                admin={UsersPolicies.isAdmin(user)}
            />
            <EditLanguageLevelsDialog
                language={language}
                currentLevelsInLanguage={levelsOfLanguage.map(level => level.level)}
                levels={levels}
            />
        </>
    )
}