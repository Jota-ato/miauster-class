import { Badge } from "@/shared/components/ui/badge";
import { Level } from "../types/levels.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function formatDate(date: Date) {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function LevelDetailsCard({ level }: { level: Level }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{level.name}</CardTitle>
          {level.description && (
            <CardDescription>{level.description}</CardDescription>
          )}
        </div>
        <Badge variant={level.isActive ? "default" : "secondary"}>
          {level.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Creado</p>
            <p className="text-sm font-medium">{formatDate(level.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Última actualización
            </p>
            <p className="text-sm font-medium">{formatDate(level.updatedAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
