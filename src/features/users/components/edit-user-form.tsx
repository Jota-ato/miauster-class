"use client"
import { FieldWLabel } from "@/shared/components/forms/field-w-label"
import { User } from "../types/user.types"
import {
    FieldSet,
    FieldGroup,
} from "@/shared/components/ui/field"
import { EditUserInput, editUserSchema } from "../schema/user-schema"
import { FieldInput } from "@/shared/components/forms/field-inputs.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormSubmit } from "@/shared/components/forms/form-submit"
import { roles } from "@/db/schema"
import { CustomSelect } from "@/shared/components/forms/custom-select"
import { rolesTranslatedMap } from "@/shared/utils/roles"
import { showResponse } from "@/shared/lib/client-actions"
import { editUserAction } from "../actions/user-actions"

const inputs: FieldInput<EditUserInput>[] = [
    {
        label: "Nombre",
        name: "name"
    },
    {
        label: "Teléfono",
        name: "phone"
    },
]

export function EditUserForm({
    user,
    currentUser
}: {
    user: User,
    currentUser: User
}) {

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting }
    } = useForm<EditUserInput>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: user.name,
            phone: user.phone || "",
            role: user.role
        }
    })

    const onSubmit = async (data: EditUserInput) => {
        showResponse(await editUserAction(
            user.id,
            currentUser.id,
            data
        ))
    }

    return (
        <form
            className="p-4"
            onSubmit={handleSubmit(onSubmit)}
        >
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
                    <CustomSelect 
                            control={control}
                            groupLabel="Rol"
                            name="role"
                            placeholder="Rol del usuario"
                            options={roles.enumValues.map(role => ({
                                value: role,
                                label: rolesTranslatedMap[role]
                            }))}
                        />
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