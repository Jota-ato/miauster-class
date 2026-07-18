import { Level } from "../types/levels.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function LevelDetailsCard({ level }: { level: Level }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{level.name}</CardTitle>
        {level.description && (
          <CardDescription>{level.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p>Estado: {level.isActive ? "Activo" : "Inactivo"}</p>
      </CardContent>
    </Card>
  );
}
