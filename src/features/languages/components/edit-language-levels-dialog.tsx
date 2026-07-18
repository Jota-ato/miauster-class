"use client";

import { Level } from "@/features/levels/types/levels.types";
import { Language } from "../types/languages.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useLanguageLevelStore } from "@/features/levels/stores/language-level-store";
import { EditLevelToLanguageForm } from "./edit-language-levels-form";

export function EditLanguageLevelsDialog({
  language,
  currentLevelsInLanguage,
  levels,
}: {
  language: Language;
  currentLevelsInLanguage: Level[];
  levels: Level[];
}) {
  const { dialogOpen, setDialogOpen } = useLanguageLevelStore();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar niveles del idioma: {language.name}</DialogTitle>
          <DialogDescription>
            Aquí puedes agregar o eliminar niveles para el idioma seleccionado.
          </DialogDescription>
          <EditLevelToLanguageForm
            currentLevelsInLanguage={currentLevelsInLanguage}
            language={language}
            levels={levels}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
