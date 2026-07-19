import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { Language } from "../types/languages.types";
import { Badge } from "@/shared/components/ui/badge";

export function LanguageDetailsCard({ language }: { language: Language }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Idioma: {language.name}</CardTitle>
        <CardDescription>Información detallada del idioma.</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant={language.isActive ? "default" : "destructive"}>
          {language.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </CardContent>
    </Card>
  );
}
