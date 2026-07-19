"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CustomSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  error?: string | null;
  disabled?: boolean;
}

export function CustomSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  error,
  disabled,
}: CustomSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field
          orientation="horizontal"
          data-invalid={!!error}
        >
          <FieldContent>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {description && (
              <FieldDescription>{description}</FieldDescription>
            )}
            {error && <FieldError>{error}</FieldError>}
          </FieldContent>
          <Switch
            id={name}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled}
            aria-invalid={!!error}
          />
        </Field>
      )}
    />
  );
}