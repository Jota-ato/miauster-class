import { LanguageLevelWithLanguage } from "@/features/languages/types/languages.types";

export function LanguageLevelFlag({
  languageLevel,
}: {
  languageLevel: LanguageLevelWithLanguage;
}) {
  return (
    <span className="inline-block w-full sm:w-auto text-center px-6 py-4 bg-muted border border-border rounded-md">
      {languageLevel.language.name}
    </span>
  );
}
