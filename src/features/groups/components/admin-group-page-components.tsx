"use client";
import { EditableToggleCard } from "@/shared/components/dashboard/editable-toggle-card";
import { FullGroup } from "../types/groups.types";
import { DetailGroupCard } from "./detail-group-card";
import { EditGroupFormCard } from "./forms-cards";
import { LanguageLevelWithLanguageAndLevel } from "@/features/levels/types/levels.types";

export function GroupCardToggle({
  group,
  languageLevels,
}: {
  group: FullGroup;
  languageLevels: LanguageLevelWithLanguageAndLevel[];
}) {
  return (
    <EditableToggleCard
      viewComponent={<DetailGroupCard group={group} />}
      editComponent={
        <EditGroupFormCard group={group} languageLevels={languageLevels} />
      }
    />
  );
}
