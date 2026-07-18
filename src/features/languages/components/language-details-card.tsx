import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { LanguageForm } from "./language-form";
import { Language } from "../types/languages.types";

export function LanguageDetailsCard({ language }: { language: Language }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Idioma: {language.name}</CardTitle>
        <CardDescription>Información detallada del idioma.</CardDescription>
      </CardHeader>
      <CardContent>Activo: {language.isActive ? "Sí" : "No"}</CardContent>
    </Card>
  );
}
