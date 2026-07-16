"use client"

import { LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"
import { Level } from "../types/levels.types"
import {
    FieldSet,
    FieldGroup,
} from "@/shared/components/ui/field"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    languageLevelSchema,
    LanguageLevelInput
} from "../schemas/language-level-schema"
import { FormSubmit } from "@/shared/components/forms/form-submit"

export function AddLanguageToLevelForm({
    level,
    languages
}: {
    level: Level,
    languages: LanguageLevelWithLanguage[]
}) {

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<LanguageLevelInput>({
        resolver: zodResolver(languageLevelSchema),
        defaultValues: {
            languages: []
        }
    })

    const onSubmit = async (data: LanguageLevelInput) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                <FormSubmit 
                    isSubmitting={isSubmitting}
                    label="Agregar idiomas"
                    isSubmittingLabel="Agregando idiomas..."
                />
            </FieldSet>
        </form>
    )
}