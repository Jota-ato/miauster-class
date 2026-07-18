"use client";

import {
  Level,
} from "@/features/levels/types/levels.types";
import { Language } from "../types/languages.types";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
} from "@/shared/components/ui/field";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  languageLevelSchema,
  LanguageLevelInput,
} from "../schema/languages-schema";
import { FormSubmit } from "@/shared/components/forms/form-submit";
import { Checkbox } from "@/shared/components/ui/checkbox";

export function EditLevelToLanguageForm({
  language,
  currentLevelsInLanguage,
  levels,
}: {
  language: Language;
  currentLevelsInLanguage: Level[];
  levels: Level[];
}) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LanguageLevelInput>({
    resolver: zodResolver(languageLevelSchema),
    defaultValues: {
      levelsId: currentLevelsInLanguage.map(
        (level) => level.id,
      ),
    },
  });

  const onSubmit = async (data: LanguageLevelInput) => {
    // TODO: conectar con server action para actualizar los niveles del idioma
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <Controller
          name="levelsId"
          control={control}
          render={({ field }) => (
            <>
              {levels.map((level) => {
                const isChecked = field.value?.includes(level.id) ?? false;

                const handleCheckedChange = (checked: boolean) => {
                  const currentValue = field.value ?? [];
                  if (checked) {
                    field.onChange([...currentValue, level.id]);
                  } else {
                    field.onChange(
                      currentValue.filter((id: string) => id !== level.id),
                    );
                  }
                };

                return (
                  <Field key={level.id} orientation="horizontal">
                    <Checkbox
                      id={level.id}
                      checked={isChecked}
                      onCheckedChange={handleCheckedChange}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={level.id}>
                        {level.name}
                      </FieldLabel>
                    </FieldContent>
                  </Field>
                );
              })}
            </>
          )}
        />

        <FormSubmit
          isSubmitting={isSubmitting}
          label="Agregar niveles"
          isSubmittingLabel="Agregando niveles..."
        />
      </FieldSet>
    </form>
  );
}