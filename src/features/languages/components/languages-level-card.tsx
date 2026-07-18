import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Language, LanguageLevelWithLevel } from "../types/languages.types";
import { Flag } from "@/shared/components/ui/flag";
import { EditLanguageLevelFlag } from "@/features/levels/components/edit-language-level-flag";

export function LanguagesLevelCard({
  language,
  levels,
  admin,
}: {
  language: Language;
  levels: LanguageLevelWithLevel[];
  admin?: boolean;
}) {
  const description = admin
    ? "Listado de niveles disponibles para este idioma"
    : "Niveles disponibles para este idioma";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Niveles con idiomas: {language.name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {levels.length ? (
          <div className="flex md:inline-flex flex-col sm:flex-row items-center gap-4 md:mr-4">
            {levels.map((languageLevel) => (
              <Flag key={languageLevel.id} label={languageLevel.level.name} />
            ))}
          </div>
        ) : (
          <Flag label="No hay niveles disponibles" />
        )}
        {admin && (
          <EditLanguageLevelFlag 
            editLevels={false}
          />
        )}
      </CardContent>
    </Card>
  );
}
