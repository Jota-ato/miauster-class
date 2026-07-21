import { FormCard } from "@/shared/components/forms/form-card";
import { InscriptionForm } from "./inscription-form";

export function CreateInscriptionCard() {
  return (
    <FormCard
      title="Crear inscripción"
      description="Crea una nueva inscripción para un estudiante en un curso específico. Asegúrate de proporcionar la información correcta antes de enviar el formulario."
    >
      <InscriptionForm />
    </FormCard>
  );
}
