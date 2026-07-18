"use client";

import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { User } from "../types/user.types";
import { FieldSet, FieldGroup } from "@/shared/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editOwnUserSchema, EditOwnUserInput } from "../schema/user-schema";
import { FieldInput } from "@/shared/components/forms/field-inputs.types";
import { FormSubmit } from "@/shared/components/forms/form-submit";
import { showResponse } from "@/shared/lib/client-actions";
import { editOwnUserAction } from "../actions/user-actions";

const inputs: FieldInput<EditOwnUserInput>[] = [
  {
    label: "Nombre",
    name: "name",
  },
  {
    label: "Teléfono",
    name: "phone",
  },
];

export function EditOwnUserForm({ user }: { user: User }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditOwnUserInput>({
    resolver: zodResolver(editOwnUserSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone || "",
    },
  });

  const onSubmit = async (data: EditOwnUserInput) => {
    showResponse(await editOwnUserAction(data, user.id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          {inputs.map((input) => (
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
  );
}
