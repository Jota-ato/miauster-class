"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Calendar } from "@/shared/components/ui/calendar";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const SPANISH_MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function buildRealDate(
  day: number,
  monthIndex: number,
  year: number,
): Date | undefined {
  const date = new Date(year, monthIndex, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === monthIndex &&
    date.getDate() === day;

  return isRealDate && isValidDate(date) ? date : undefined;
}

function parseSpanishDate(value: string): Date | undefined {
  const trimmed = value.trim();

  // dd/mm/yyyy o dd-mm-yyyy
  const numericMatch = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (numericMatch) {
    const [, day, month, year] = numericMatch;
    return buildRealDate(Number(day), Number(month) - 1, Number(year));
  }

  // "02 de abril de 2026" (también acepta "2 abril 2026", sin "de")
  const naturalMatch = trimmed.match(
    /^(\d{1,2})\s+(?:de\s+)?([a-záéíóúñ]+)\s+(?:de|del)?\s*(\d{4})$/i,
  );
  if (naturalMatch) {
    const [, day, monthName, year] = naturalMatch;
    const monthIndex = SPANISH_MONTHS[normalize(monthName)];
    if (monthIndex === undefined) {
      return undefined;
    }
    return buildRealDate(Number(day), monthIndex, Number(year));
  }

  return undefined;
}

function parsePastedDate(value: string): Date | undefined {
  // Uso más flexible, pensado solo para onBlur (ej. si el usuario pega un ISO string).
  const fallback = new Date(value);
  return isValidDate(fallback) ? fallback : undefined;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface DatePickerInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function DatePickerInput<T extends FieldValues>({
  control,
  name,
  label = "Fecha",
  placeholder = "02 de abril de 2026",
  disabled,
}: DatePickerInputProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedDate: Date | undefined = field.value
          ? new Date(field.value)
          : undefined;

        const [inputValue, setInputValue] = React.useState(
          formatDate(selectedDate),
        );
        const [month, setMonth] = React.useState<Date | undefined>(
          selectedDate,
        );

        // Mantiene el texto del input sincronizado si el valor cambia desde afuera
        React.useEffect(() => {
          setInputValue(formatDate(selectedDate));
          setMonth(selectedDate);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [field.value]);

        return (
          <Field data-invalid={fieldState.invalid || undefined}>
            {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
            <InputGroup>
              <InputGroupInput
                id={name}
                value={inputValue}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  const raw = e.target.value;
                  setInputValue(raw);

                  const parsed = parseSpanishDate(raw);
                  if (parsed) {
                    field.onChange(parsed);
                    setMonth(parsed);
                  }
                }}
                onBlur={() => {
                  field.onBlur();

                  // Si ya se confirmó vía onChange, no hay nada más que hacer
                  if (field.value) {
                    return;
                  }

                  // Último intento: parseo flexible por si pegaron un ISO string
                  const pasted = parsePastedDate(inputValue);
                  if (pasted) {
                    field.onChange(pasted);
                    setInputValue(formatDate(pasted));
                    setMonth(pasted);
                    return;
                  }

                  // No se pudo interpretar: revierte al último valor confirmado
                  setInputValue(formatDate(selectedDate));
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger
                    render={
                      <InputGroupButton
                        id={`${name}-trigger`}
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Seleccionar fecha"
                        disabled={disabled}
                      >
                        <CalendarIcon />
                        <span className="sr-only">Seleccionar fecha</span>
                      </InputGroupButton>
                    }
                  />
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        field.onChange(date);
                        setInputValue(formatDate(date));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </Field>
        );
      }}
    />
  );
}