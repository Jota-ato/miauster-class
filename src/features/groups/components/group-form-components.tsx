"use client";

import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { GroupInput } from "../schemas/group-schema";
import { FieldInput } from "@/shared/components/forms/field-inputs.types";
import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { CustomSelect } from "@/shared/components/forms/custom-select";
import { LanguageLevelWithLanguageAndLevel } from "@/features/levels/types/levels.types";
import { DatePickerInput } from "@/shared/components/forms/date-picker";
import { CustomSwitch } from "@/shared/components/forms/custom-switch";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { daysOfWeekEnum } from "@/db/schema";
import { translatedDaysOfWeek } from "@/shared/utils/daysOfWeek";

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
];

interface BaseFieldsProps {
  languageLevels: LanguageLevelWithLanguageAndLevel[];
  control: Control<GroupInput>;
  register: UseFormRegister<GroupInput>;
  errors: FieldErrors<GroupInput>;
}

export function GroupFormBaseFields({
  languageLevels,
  control,
  register,
  errors,
}: BaseFieldsProps) {
  return (
    <>
      <CustomSelect
        error={errors.languageLevelId?.message}
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
          error={(errors as any)[input.name]?.message}
          key={input.name}
          register={register}
          {...input}
        />
      ))}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {inputs.slice(1).map((input) => (
          <FieldWLabel
            error={(errors as any)[input.name]?.message}
            key={input.name}
            register={register}
            valueAsNumber={input.type === "number"}
            {...input}
          />
        ))}
        <DatePickerInput
          control={control}
          name="startDate"
          label="Fecha de inicio"
          placeholder="01 de junio de 2025"
        />
        <DatePickerInput
          control={control}
          name="endDate"
          label="Fecha de finalización"
          placeholder="01 de junio de 2025"
        />
      </div>
    </>
  );
}

interface SwitchesProps {
  control: Control<GroupInput>;
}

export function GroupFormSwitches({ control }: SwitchesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 bg-muted/30 p-4 rounded-lg border">
      <CustomSwitch
        control={control}
        name="isActive"
        label="Estado del grupo"
        description="Determina si el grupo está activo"
      />
      <CustomSwitch
        control={control}
        name="particular"
        label="Grupo particular"
        description="Determina si es una clase privada"
      />
      <CustomSwitch
        control={control}
        name="regularSchedule"
        label="Horario regular"
        description="Lunes a jueves, 1 hora fija"
      />
    </div>
  );
}

interface RegularProps {
  register: UseFormRegister<GroupInput>;
  errors: FieldErrors<GroupInput>;
}

export function RegularScheduleFields({ register, errors }: RegularProps) {
  return (
    <div className="space-y-2">
      <Heading level={3} className="text-sm font-medium text-foreground">
        Definir horas del horario regular
      </Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWLabel
          error={(errors as any).startTime?.message}
          name="startTime"
          label="Hora de inicio"
          type="time"
          register={register}
        />
        <FieldWLabel
          error={(errors as any).endTime?.message}
          name="endTime"
          label="Hora de finalización"
          type="time"
          register={register}
        />
      </div>
    </div>
  );
}

interface IrregularProps {
  control: Control<GroupInput>;
  register: UseFormRegister<GroupInput>;
  errors: FieldErrors<GroupInput>;
  fields: Record<string, any>[];
  append: UseFieldArrayAppend<any, any>;
  remove: UseFieldArrayRemove;
}

export function IrregularScheduleFields({
  control,
  register,
  errors,
  fields,
  append,
  remove,
}: IrregularProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Heading
            level={3}
            className="text-sm! text-left font-medium text-foreground"
          >
            Horarios personalizados
          </Heading>
          <p className="text-xs text-muted-foreground">
            Agrega los días y horas específicas del grupo.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ day: "MONDAY", startTime: "", endTime: "" })}
        >
          <Plus /> Agregar día
        </Button>
      </div>

      {(errors as any).slots?.message && (
        <p className="text-xs font-medium text-destructive">
          {(errors as any).slots?.message}
        </p>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 sm:flex-row sm:items-center bg-muted/20 p-3 rounded-md border relative"
          >
            <Field className="flex-1 min-w-[140px]">
              <FieldLabel
                htmlFor={`slots.${index}.day`}
                className="text-xs font-medium text-muted-foreground mb-1 block"
              >
                Día
              </FieldLabel>
              <CustomSelect
                control={control}
                name={`slots.${index}.day`}
                options={daysOfWeekEnum.enumValues.map((day) => ({
                  value: day,
                  label: translatedDaysOfWeek[day],
                }))}
              />
            </Field>

            <div className="flex-1">
              <FieldWLabel
                error={(errors as any).slots?.[index]?.startTime?.message}
                name={`slots.${index}.startTime`}
                label="Hora inicio"
                type="time"
                register={register}
              />
            </div>

            <div className="flex-1">
              <FieldWLabel
                error={(errors as any).slots?.[index]?.endTime?.message}
                name={`slots.${index}.endTime`}
                label="Hora fin"
                type="time"
                register={register}
              />
            </div>

            <Button
              type="button"
              onClick={() => remove(index)}
              variant="destructive"
              size="sm"
            >
              <Trash />
              Eliminar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
