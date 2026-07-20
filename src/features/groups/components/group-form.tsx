"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { groupSchema, GroupInput } from "../schemas/group-schema";
import { LanguageLevelWithLanguageAndLevel } from "@/features/levels/types/levels.types";
import { FormSubmit } from "@/shared/components/forms/form-submit";
import {
  GroupFormBaseFields,
  GroupFormSwitches,
  RegularScheduleFields,
  IrregularScheduleFields,
} from "./group-form-components";

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
    defaultValues: {
      isActive: true,
      particular: false,
      regularSchedule: true,
      startTime: "",
      endTime: "",
      slots: [],
    } as any,
  });

  const isRegular = useWatch({
    control,
    name: "regularSchedule",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots" as any,
  });

  const onSubmit = async (data: GroupInput) => {
    console.log("Datos enviados al backend:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <GroupFormBaseFields
            languageLevels={languageLevels}
            control={control}
            register={register}
            errors={errors}
          />

          <GroupFormSwitches control={control} />

          <hr className="my-2 border-muted" />

          {isRegular ? (
            <RegularScheduleFields register={register} errors={errors} />
          ) : (
            <IrregularScheduleFields
              control={control}
              register={register}
              errors={errors}
              fields={fields}
              append={append}
              remove={remove}
            />
          )}
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
