"use client";
import { useState } from "react";
import { FullGroup } from "../types/groups.types";
import { DetailGroupCard } from "./detail-group-card";
import { EditGroupFormCard } from "./forms-cards";
import { LanguageLevelWithLanguageAndLevel } from "@/features/levels/types/levels.types";
import { Button } from "@/shared/components/ui/button";
import { Eye, PenSquare } from "lucide-react";

export function GroupCardToggle({
  group,
  languageLevels,
}: {
  group: FullGroup;
  languageLevels: LanguageLevelWithLanguageAndLevel[];
}) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <Button onClick={() => setEdit(prev => !prev)} className="mb-4">
        {edit ? (
            <><Eye /> Ver detalles</>
        ): (
            <><PenSquare /> Editar</>
        )}
      </Button>
      {edit ? (
        <EditGroupFormCard group={group} languageLevels={languageLevels} />
      ) : (
        <DetailGroupCard group={group} />
      )}
    </>
  );
}
