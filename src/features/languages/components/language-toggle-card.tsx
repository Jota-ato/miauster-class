import { EditableToggleCard } from "@/shared/components/dashboard/editable-toggle-card";
import { EditLanguageCard } from "./forms-cards";
import { Language } from "../types/languages.types";
import { LanguageDetailsCard } from "./language-details-card";

export function LanguageToggleCard({
    language
}: {
    language: Language
}) {
  return (
    <EditableToggleCard 
        editComponent={<EditLanguageCard language={language} />}
        viewComponent={<LanguageDetailsCard language={language} />}
    />
  )
}