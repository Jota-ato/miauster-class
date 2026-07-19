import { FormCard } from "@/shared/components/forms/form-card";
import { LanguageForm } from "./language-form";
import { Language } from "../types/languages.types";

export function AddLanguageCard() {
  return (
    <FormCard
      title="Agregar idioma"
      description="Agrega un nuevo idioma a la plataforma para que los usuarios puedan acceder a él."
    >
      <LanguageForm />
    </FormCard>
  );
}

export function EditLanguageCard({ language }: { language: Language }) {
  return (
    <FormCard 
      title="Editar idioma" 
      description="Editar información del idioma."
    >
      <LanguageForm language={language} />
    </FormCard>
  );
}