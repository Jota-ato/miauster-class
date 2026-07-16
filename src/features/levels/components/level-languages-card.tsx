import { LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"
import { Level } from "../types/levels.types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card"

export function LevelLanguagesCard({
    level,
    isAdmin = false,
    languages
}: {
    level: Level
    isAdmin?: boolean
    languages: LanguageLevelWithLanguage[]
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Idiomas con nivel: {level.name}</CardTitle>
                <CardDescription>Listado de idiomas disponibles para este nivel</CardDescription>
            </CardHeader>
            <CardContent>
                {languages.length ? (
                    <div className="flex items-center gap-4">
                        {languages.map(languageLevel => (
                            <span
                                key={languageLevel.id}
                                className="inline-block px-6 py-4 bg-muted border border-border rounded-md"
                            >
                                {languageLevel.language.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span>No hay idiomas disponibles para este nivel</span>
                )}
            </CardContent>
        </Card>
    )
}