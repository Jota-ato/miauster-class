import { FormCard } from "@/shared/components/forms/form-card";
import { InscriptionForm } from "./inscription-form";
import { DetailedGroup } from "@/features/groups/types/groups.types";
import { Inscription } from "../types/inscriptions.types";

export function CreateInscriptionCard({
  groups,
  userId,
}: {
  groups: DetailedGroup[];
  userId: string;
}) {
  return (
    <FormCard
      title="Crear inscripción"
      description="Crea una nueva inscripción para un estudiante en un curso específico. Asegúrate de proporcionar la información correcta antes de enviar el formulario."
    >
      <InscriptionForm groups={groups} userId={userId} />
    </FormCard>
  );
}

export function EditInscriptionCard({
  groups,
  userId,
  inscription,
}: {
  groups: DetailedGroup[];
  userId: string;
  inscription: Inscription;
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
      />
    </FormCard>
  );
}
