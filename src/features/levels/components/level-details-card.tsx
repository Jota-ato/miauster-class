import { Badge } from "@/shared/components/ui/badge";
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
        <Badge variant={level.isActive ? "default" : "destructive"}>
          {level.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </CardContent>
    </Card>
  );
}
