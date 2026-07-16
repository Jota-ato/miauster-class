"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/shared/components/ui/dialog"
import { useLanguageLevelStore } from "../stores/language-level-store"
import { Level } from "../types/levels.types"
import { Language, LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"
import { AddLanguageToLevelForm } from "./add-language-to-level-form"

export function AddLanguageToLevelDialog({
    level,
    currentLanguagesInLevel,
    languages
}: {
    level: Level,
    currentLanguagesInLevel: LanguageLevelWithLanguage[]
    languages: Language[]
}) {

    const { dialogOpen, setDialogOpen } = useLanguageLevelStore()

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar idioma a nivel {level.name}</DialogTitle>
                    <DialogDescription>
                        Selecciona el idioma que deseas agregar a este nivel. Una vez agregado, podrás crear grupos con este nivel e idioma.
                    </DialogDescription>
                </DialogHeader>
                <AddLanguageToLevelForm 
                    level={level}
                    currentLanguagesInLevel={currentLanguagesInLevel}
                    languages={languages}
                />
            </DialogContent>
        </Dialog>
    )
}