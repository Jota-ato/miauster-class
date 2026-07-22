"use client"

import { ComponentProps } from "react"
import {
    Field,
    FieldLabel,
    FieldError
} from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type FieldWLabelProps<TFieldValues extends FieldValues> = {
    label: string
    name: Path<TFieldValues>
    register: UseFormRegister<TFieldValues>
    error?: string | null
    orientation?: ComponentProps<typeof Field>["orientation"]
} & Omit<ComponentProps<typeof Input>, "name">

export function FieldWLabel<TFieldValues extends FieldValues>({
    label,
    name,
    register,
    error,
    orientation,
    ...inputProps
}: FieldWLabelProps<TFieldValues>) {
    
    return (
        <Field orientation={orientation} data-invalid={!!error}>
            <FieldLabel htmlFor={name}>
                {label}
            </FieldLabel>
            <Input
                id={name}
                aria-invalid={!!error}
                {...inputProps}
                {...register(name, { valueAsNumber: inputProps.type === "number" })}
            />
            {error && (
                <FieldError>
                    {error}
                </FieldError>
            )}
        </Field>
    )
}