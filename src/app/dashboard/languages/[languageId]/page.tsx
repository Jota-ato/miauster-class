import { EditLanguageCard } from "@/features/languages/components/edit-language-level-card"
import { LanguageDetailsCard } from "@/features/languages/components/language-details-card"
import { languagesService } from "@/features/languages/services/languages-service"
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

    return (
        <>
            <Heading>{language.name}</Heading>
            {UsersPolicies.isAdmin(user) ? (
                <EditLanguageCard 
                    language={language}
                />
            ): (
                <LanguageDetailsCard 
                    language={language}
                />
            )}   
        </>
    )
}