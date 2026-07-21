import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Language } from "../types/languages.types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function formatDate(date: Date) {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function LanguageDetailsCard({ language }: { language: Language }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{language.name}</CardTitle>
          <CardDescription>Información detallada del idioma.</CardDescription>
        </div>
        <Badge variant={language.isActive ? "default" : "secondary"}>
          {language.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Creado</p>
            <p className="text-sm font-medium">
              {formatDate(language.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Última actualización</p>
            <p className="text-sm font-medium">
              {formatDate(language.updatedAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}