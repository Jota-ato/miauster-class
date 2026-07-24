import { FormCard } from "@/shared/components/forms/form-card";
import { InscriptionForm } from "./inscription-form";
import { DetailedGroup } from "@/features/groups/types/groups.types";
import { Inscription, InscriptionWithLanguage } from "../types/inscriptions.types";
import { Language } from "@/features/languages/types/languages.types";

export function CreateInscriptionCard({
  groups,
  userId,
  languages
}: {
  groups: DetailedGroup[];
  userId: string;
  languages: Language[]
}) {
  return (
    <FormCard
      title="Crear inscripción"
      description="Crea una nueva inscripción para un estudiante en un curso específico. Asegúrate de proporcionar la información correcta antes de enviar el formulario."
    >
      <InscriptionForm groups={groups} userId={userId} languages={languages} />
    </FormCard>
  );
}

export function EditInscriptionCard({
  groups,
  userId,
  inscription,
  languages
}: {
  groups: DetailedGroup[];
  userId: string;
  inscription: InscriptionWithLanguage;
  languages: Language[]
}) {
  return (
    <FormCard
      title="Editar inscripción"
      description="Edita la inscripción de un estudiante en un curso específico. Asegúrate de proporcionar la información correcta antes de enviar el formulario."
    >
      <InscriptionForm
        groups={groups}
        userId={userId}
        inscription={inscription}
        languages={languages}
      />
    </FormCard>
  );
}
