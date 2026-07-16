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
import { addLanguageAction } from "../actions/language-actions"
import { Language } from "../types/languages.types"

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
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(languageSchema),
        defaultValues: {
            name: language?.name || ""
        }
    })

    const label = isEditing ? "Actualizar idioma" : "Agregar idioma"
    const isSubmittingLabel = isEditing ? "Actualizando idioma..." : "Agregando idioma..."

    const onSubmit = async (data: LanguageInput) => {
        showResponse(await addLanguageAction(
            data
        ))
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