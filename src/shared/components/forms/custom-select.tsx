import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface SelectOption {
  value: any;
  label: string;
}

interface GenericSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: SelectOption[];
  placeholder?: string;
  groupLabel?: string;
  error?: string | null;
    label?: string;
}

export function CustomSelect<T extends FieldValues>({
  control,
  name,
  options,
  error,
  label,
  placeholder = "Select an option",
  groupLabel,
}: GenericSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedLabel = options.find(
          (opt) => opt.value === field.value,
        )?.label;

        return (
          <Field data-invalid={!!error}>
            {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
            <Select value={field.value} onValueChange={field.onChange} data-invalid={!!error}>
              <SelectTrigger
                id={name}
                className="w-full"
                aria-invalid={!!error}
              >
                <SelectValue placeholder={placeholder}>
                  {selectedLabel ?? placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent data-invalid={!!error}>
                <SelectGroup>
                  {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <FieldError>{error}</FieldError>}
          </Field>
        );
      }}
    />
  );
}