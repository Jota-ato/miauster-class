import { LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"
import { LanguageLevelFlag } from "./language-level-flag"
import { Button } from "@/shared/components/ui/button"
import { X } from "lucide-react"

export function AdminLanguageLevelFlag({
    languageLevel
}: {
    languageLevel: LanguageLevelWithLanguage
}) {
    return (
        <div className="relative w-full md:w-auto">
            <LanguageLevelFlag
                languageLevel={languageLevel}
            />
            <Button
                variant="outline"
                size="icon"
                className="absolute -top-2 -right-2 rounded-full flex size-4 cursor-pointer"
            >
                <X className="size-3" />
            </Button>
        </div>
    )
}