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
import { LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"

export function AddLanguageToLevelDialog({
    level,
    languages
}: {
    level: Level,
    languages: LanguageLevelWithLanguage[]
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
            </DialogContent>
        </Dialog>
    )
}