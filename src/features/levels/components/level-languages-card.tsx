import { LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"
import { Level } from "../types/levels.types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card"
import { LanguageLevelFlag } from "./language-level-flag"
import { EditLanguageLevelFlag } from "./edit-language-level-flag"

export function LevelLanguagesCard({
    level,
    isAdmin = false,
    currentLanguagesInLevel: languages
}: {
    level: Level
    isAdmin?: boolean
    currentLanguagesInLevel: LanguageLevelWithLanguage[]
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Idiomas con nivel: {level.name}</CardTitle>
                <CardDescription>Listado de idiomas disponibles para este nivel</CardDescription>
            </CardHeader>
            <CardContent>
                {languages.length ? (
                    <div className="flex md:inline-flex flex-col sm:flex-row items-center gap-4 md:mr-4">
                        {languages.map(languageLevel => (
                            <LanguageLevelFlag
                                key={languageLevel.id}
                                languageLevel={languageLevel}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mb-4">
                        <p>No hay idiomas disponibles para este nivel, comienza agregando uno</p>
                    </div>
                )}
                {isAdmin && (
                    <EditLanguageLevelFlag />
                )}
            </CardContent>
        </Card>
    )
}