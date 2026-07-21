import { EditableToggleCard } from "@/shared/components/dashboard/editable-toggle-card";
import { Level } from "../types/levels.types";
import { EditLevelCard } from "./forms-cards";
import { LevelDetailsCard } from "./level-details-card";


export function LevelToggleCards({
    level
}: {
    level: Level
}) {
  return (
    <EditableToggleCard 
        editComponent={<EditLevelCard level={level} />}
        viewComponent={<LevelDetailsCard level={level} />}
    />
  )
}