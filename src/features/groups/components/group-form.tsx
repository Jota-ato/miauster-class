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
import { showResponse } from "@/shared/lib/client-actions";
import { createGroupAction, updateGroupAction } from "../actions/group-actions";
import { FullGroup } from "../types/groups.types";

export function GroupForm({
  languageLevels,
  group,
}: {
  languageLevels: LanguageLevelWithLanguageAndLevel[];
  group?: FullGroup;
}) {
  const isEditing = !!group;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GroupInput>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: group?.name ?? "",
      languageLevelId: group?.languageLevelId ?? "",
      maxStudents: group?.maxStudents ?? 1,
      weeklyPrice: group ? Number(group.weeklyPrice) : 0,
      isActive: group?.isActive ?? true,
      particular: group?.particular ?? false,
      startDate: group ? new Date(group.startDate) : undefined,
      endDate: group ? new Date(group.endDate) : undefined,
      regularSchedule: group?.regularSchedule ?? true,
      startTime:
        group?.regularSchedule && group.schedules[0]
          ? group.schedules[0].startTime
          : "",
      endTime:
        group?.regularSchedule && group.schedules[0]
          ? group.schedules[0].endTime
          : "",
      slots:
        group && !group.regularSchedule
          ? group.schedules.map((schedule) => ({
              day: schedule.dayOfWeek,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
            }))
          : [],
    } as GroupInput,
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
    if (isEditing && group) {
      showResponse(await updateGroupAction(group.id, data));
    } else {
      showResponse(await createGroupAction(data));
    }
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
          label={isEditing ? "Guardar cambios" : "Crear grupo"}
          isSubmittingLabel={isEditing ? "Guardando..." : "Creando..."}
        />
      </FieldSet>
    </form>
  );
}