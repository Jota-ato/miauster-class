import { FormCard } from "@/shared/components/forms/form-card";
import { LevelForm } from "./level-form";
import { Level } from "../types/levels.types";

export function AddLevelCard() {
  return (
    <FormCard
      title="Agregar nivel"
      description="Agrega un nuevo nivel a la plataforma para que los usuarios puedan acceder a él."
    >
      <LevelForm />
    </FormCard>
  );
}

export function EditLevelCard({ level }: { level: Level }) {
  return (
    <FormCard 
      title="Editar nivel" 
      description="Modifica los detalles del nivel"
    >
      <LevelForm level={level} />
    </FormCard>
  );
}