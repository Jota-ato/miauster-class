"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { levelsSchema, LevelsInput } from "../schemas/levels-schema"
import {
    FieldSet,
    FieldGroup,
    Field,
    FieldLabel,
    FieldError
} from "@/shared/components/ui/field"
import { FieldInput } from "@/shared/components/forms/field-inputs.types"
import { FieldWLabel } from "@/shared/components/forms/field-w-label"
import { FormSubmit } from "@/shared/components/forms/form-submit"
import { showResponse } from "@/shared/lib/client-actions"
import { createLevelAction } from "../actions/levels-actions"
import { Textarea } from "@/shared/components/ui/textarea"
import { Level } from "../types/levels.types"
import { CustomSelect } from "@/shared/components/forms/custom-select"

const fields: FieldInput<LevelsInput>[] = [
    {
        name: "name",
        label: "Nombre del nivel",
        placeholder: "Ejemplo: Básico 1",
        type: "text"
    }
]

const options = [
    {
        value: true,
        label: "Activo"
    },
    {
        value: false,
        label: "Inactivo"
    },
]

export function LevelForm({
    level
}: {
    level?: Level
}) {

    const isEditing = !!level

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting }
    } = useForm<LevelsInput>({
        resolver: zodResolver(levelsSchema),
        defaultValues: {
            name: level?.name ?? "",
            description: level?.description ?? "",
            isActive: level?.isActive ?? true
        }
    })

    const onSubmit = async (data: LevelsInput) => {
        showResponse(await createLevelAction(data))
    }

    const label = isEditing ? "Actualizar nivel" : "Agregar nivel"
    const submittingLabel = isEditing ? "Actualizando nivel..." : "Agregando nivel..."

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
                    <CustomSelect 
                        control={control}
                        name="isActive"
                        options={options}
                    />
                    <Field>
                        <FieldLabel htmlFor="description">
                            Descripción (opcional)
                        </FieldLabel>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Descripción del nivel"
                        />
                        <FieldError>
                            {errors.description?.message}
                        </FieldError>
                    </Field>
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