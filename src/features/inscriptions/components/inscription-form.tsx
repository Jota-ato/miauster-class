"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { inscriptionSchema, InscriptionInput } from "../schemas/inscription-schemas";

export function InscriptionForm() {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InscriptionInput>({
        resolver: zodResolver(inscriptionSchema),
    })

    const onSubmit = (data: InscriptionInput) => {

    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
            <FieldGroup>

            </FieldGroup>
        </FieldSet>
    </form>
  )
}