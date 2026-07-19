"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { groupSchema, GroupInput } from "../schemas/group-schema";
import { FieldInput } from "@/shared/components/forms/field-inputs.types";
import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { CustomSelect } from "@/shared/components/forms/custom-select";
import { LanguageLevelWithLanguageAndLevel } from "@/features/levels/types/levels.types";
import { FormSubmit } from "@/shared/components/forms/form-submit";

const inputs: FieldInput<GroupInput>[] = [
  {
    name: "name",
    label: "Nombre del grupo",
    type: "text",
    placeholder: "Nombre del grupo",
  },
  {
    name: "maxStudents",
    label: "Número máximo de estudiantes",
    type: "number",
    step: 1,
    placeholder: "Número máximo de estudiantes",
  },
  {
    name: "weeklyPrice",
    label: "Precio semanal",
    type: "number",
    step: 0.01,
    placeholder: "Precio semanal",
  },
  {
    name: "startDate",
    label: "Fecha de inicio",
    type: "date",
    placeholder: "Fecha de inicio",
  },
  {
    name: "endDate",
    label: "Fecha de finalización",
    type: "date",
    placeholder: "Fecha de finalización",
  },
];

export function GroupForm({
  languageLevels,
}: {
  languageLevels: LanguageLevelWithLanguageAndLevel[];
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GroupInput>({
    resolver: zodResolver(groupSchema),
  });

  const onSubmit = async (data: GroupInput) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <CustomSelect
            control={control}
            name="languageLevelId"
            placeholder="Idioma del grupo"
            options={languageLevels.map((langLevel) => ({
              value: langLevel.id,
              label: `${langLevel.language.name} - ${langLevel.level.name}`,
            }))}
          />
          {inputs.slice(0, 1).map((input) => (
            <FieldWLabel
              error={errors[input.name]?.message}
              key={input.name}
              register={register}
              {...input}
            />
          ))}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inputs.slice(1).map((input) => (
              <FieldWLabel
                error={errors[input.name]?.message}
                key={input.name}
                register={register}
                {...input}
              />
            ))}
          </div>
        </FieldGroup>
        <FormSubmit
          isSubmitting={isSubmitting}
          label="Crear grupo"
          isSubmittingLabel="Creando..."
        />
      </FieldSet>
    </form>
  );
}
