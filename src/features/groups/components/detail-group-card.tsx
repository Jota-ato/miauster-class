import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { DetailedGroup } from "../types/groups.types";
import { translatedDaysOfWeek } from "@/shared/utils/daysOfWeek";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatCurrency } from "@/shared/utils/currency";

function formatDate(date: string) {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function DetailGroupCard({ group }: { group: DetailedGroup }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl">{group.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {group.languageLevel.language.name} ·{" "}
            {group.languageLevel.level.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={group.isActive ? "default" : "secondary"}>
            {group.isActive ? "Activo" : "Inactivo"}
          </Badge>
          {group.particular && <Badge variant="outline">Particular</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Cupo máximo</p>
            <p className="text-sm font-medium">
              {group.maxStudents} estudiantes
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Precio semanal</p>
            <p className="text-sm font-medium">
              {formatCurrency(group.weeklyPrice)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Horario</p>
            <p className="text-sm font-medium">
              {group.regularSchedule ? "Regular" : "Personalizado"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Inicio</p>
            <p className="text-sm font-medium">{formatDate(group.startDate)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Finalización</p>
            <p className="text-sm font-medium">{formatDate(group.endDate)}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-xs text-muted-foreground mb-2">Horarios</p>
          <div className="flex flex-wrap gap-2">
            {group.schedules.map((schedule) => (
              <Badge
                key={schedule.id}
                variant="outline"
                className="font-normal"
              >
                {translatedDaysOfWeek[schedule.dayOfWeek]}{" "}
                {schedule.startTime.slice(0, 5)} -{" "}
                {schedule.endTime.slice(0, 5)}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
