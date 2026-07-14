"use client"

import { FieldWLabel } from "@/shared/components/forms/field-w-label"
import { User } from "../types/user.types"
import {
    FieldSet,
    FieldGroup,
    FieldLabel,
    FieldError
} from "@/shared/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UserInput, userSchema } from "../schema/user-schema"
import { FieldInput } from "@/shared/components/forms/field-inputs.types"
import { FormSubmit } from "@/shared/components/forms/form-submit"

const inputs: FieldInput<UserInput>[] = [
    {
        label: "Nombre",
        name: "name"
    },
    {
        label: "Teléfono",
        name: "phone"
    },
]

export function UserForm({
    user
}: {
    user: User
}) {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<UserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            ...user
        }
    })

    const onSubmit = (data: UserInput) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    {inputs.map(input => (
                        <FieldWLabel
                            key={input.name}
                            label={input.label}
                            register={register}
                            name={input.name}
                            error={errors[input.name]?.message}
                        />
                    ))}
                </FieldGroup>
                <FormSubmit 
                    isSubmitting={isSubmitting}
                    isSubmittingLabel="Guardando..."
                    label="Guardar"
                />
            </FieldSet>
        </form>
    )
}