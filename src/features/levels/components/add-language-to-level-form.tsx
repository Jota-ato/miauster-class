"use client"

import { LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"
import { Level } from "../types/levels.types"
import {
    FieldSet,
    FieldGroup,
    Field,
    FieldContent,
    FieldLabel
} from "@/shared/components/ui/field"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    languageLevelSchema,
    LanguageLevelInput
} from "../schemas/language-level-schema"
import { FormSubmit } from "@/shared/components/forms/form-submit"
import { Checkbox } from "@/shared/components/ui/checkbox"

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

                <Controller
                    name="languages"
                    control={control}
                    render={({ field }) => (
                        <>
                            {languages.map(language => {
                                const isChecked = field.value?.includes(language.languageId) ?? false

                                const handleCheckedChange = (checked: boolean) => {
                                    const currentValue = field.value ?? []
                                    if (checked) {
                                        field.onChange([...currentValue, language.languageId])
                                    } else {
                                        field.onChange(
                                            currentValue.filter((id: string) => id !== language.languageId)
                                        )
                                    }
                                }

                                return (
                                    <Field key={language.id} orientation="horizontal">
                                        <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={handleCheckedChange}
                                        />
                                        <FieldContent>
                                            <FieldLabel>
                                                {language.language.name}
                                            </FieldLabel>
                                        </FieldContent>
                                    </Field>
                                )
                            })}
                        </>
                    )}
                />

                <FormSubmit
                    isSubmitting={isSubmitting}
                    label="Agregar idiomas"
                    isSubmittingLabel="Agregando idiomas..."
                />
            </FieldSet>
        </form>
    )
}