"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { languageSchema, LanguageInput } from "../schema/languages-schema"
import {
    FieldSet,
    FieldGroup
} from "@/shared/components/ui/field"
import { FieldInput } from "@/shared/components/forms/field-inputs.types"
import { FieldWLabel } from "@/shared/components/forms/field-w-label"
import { FormSubmit } from "@/shared/components/forms/form-submit"
import { showResponse } from "@/shared/lib/client-actions"
import { addLanguageAction, updateLanguageAction } from "../actions/language-actions"
import { Language } from "../types/languages.types"
import { CustomSelect } from "@/shared/components/forms/custom-select"

const inputs: FieldInput<LanguageInput>[] = [
    {
        name: "name",
        label: "Nombre del idioma",
        type: "text",
        placeholder: "Ingrese el nombre del idioma",
    }
]

export function LanguageForm({
    language
}: {
    language?: Language
}) {

    const isEditing = !!language

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(languageSchema),
        defaultValues: {
            name: language?.name || "",
            isActive: language?.isActive ?? true
        }
    })

    const label = isEditing ? "Actualizar idioma" : "Agregar idioma"
    const isSubmittingLabel = isEditing ? "Actualizando idioma..." : "Agregando idioma..."

    const onSubmit = async (data: LanguageInput) => {
        if (isEditing && language) {
            showResponse(await updateLanguageAction(
                data,
                language.id
            ))
        } else {
            showResponse(await addLanguageAction(
                data
            ))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    {inputs.map(input => (
                        <FieldWLabel
                            error={errors[input.name]?.message}
                            key={input.name}
                            register={register}
                            {...input}
                        />
                    ))}
                    {isEditing && (
                        <CustomSelect
                            control={control}
                            name="isActive"
                            options={[
                                { label: "Activo", value: true },
                                { label: "Inactivo", value: false }
                            ]}
                        />
                    )}
                </FieldGroup>
                <FormSubmit
                    isSubmitting={isSubmitting}
                    label={label}
                    isSubmittingLabel={isSubmittingLabel}
                />
            </FieldSet>
        </form>
    )
}