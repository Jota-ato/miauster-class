import { FormCard } from "@/shared/components/forms/form-card";
import { GroupForm } from "./group-form";
import { LanguageLevelWithLanguageAndLevel } from "@/features/levels/types/levels.types";

export function CreateGroupFormCard({
  languageLevels,
}: {
  languageLevels: LanguageLevelWithLanguageAndLevel[];
}) {
  return (
    <FormCard
      title="Crear grupo"
      description="Crea un nuevo grupo para que los usuarios puedan acceder a él."
    >
      <GroupForm languageLevels={languageLevels} />
    </FormCard>
  );
}
