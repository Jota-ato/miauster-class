import { FormCard } from "@/shared/components/forms/form-card";
import { GroupForm } from "./group-form";
import { LanguageLevelWithLanguageAndLevel } from "@/features/levels/types/levels.types";
import { FullGroup } from "../types/groups.types";

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

export function EditGroupFormCard({
  languageLevels,
  group,
}: {
  languageLevels: LanguageLevelWithLanguageAndLevel[];
  group: FullGroup;
}) {
  return (
    <FormCard
      title="Editar grupo"
      description="Edita los detalles del grupo."
    >
      <GroupForm languageLevels={languageLevels} group={group} />
    </FormCard>
  );
}
