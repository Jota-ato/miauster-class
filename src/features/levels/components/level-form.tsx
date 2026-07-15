"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { levelsSchema, LevelsInput } from "../schemas/levels-schema"
import {
    FieldSet,
    FieldGroup
} from "@/shared/components/ui/field"
import { FieldInput } from "@/shared/components/forms/field-inputs.types"
import { FieldWLabel } from "@/shared/components/forms/field-w-label"
import { FormSubmit } from "@/shared/components/forms/form-submit"
import { showResponse } from "@/shared/lib/client-actions"
import { createLevelAction } from "../actions/levels-actions"

const fields: FieldInput<LevelsInput>[] = [
    {
        name: "name",
        label: "Nombre del nivel",
        placeholder: "Ejemplo: Básico 1",
        type: "text"
    }
]

export function LevelForm() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<LevelsInput>({
        resolver: zodResolver(levelsSchema),
    })

    const onSubmit = async (data: LevelsInput) => {
        showResponse(await createLevelAction(data))
    }

    const label = "Agregar nivel"
    const submittingLabel = "Agregando nivel..."

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    {fields.map((field) => (
                        <FieldWLabel 
                            key={field.name}
                            register={register}
                            error={errors.name?.message}
                            {...field}
                        />
                    ))}
                </FieldGroup>
                <FormSubmit 
                    isSubmitting={isSubmitting}
                    label={label}
                    isSubmittingLabel={submittingLabel}
                />
            </FieldSet>
        </form>
    )
}