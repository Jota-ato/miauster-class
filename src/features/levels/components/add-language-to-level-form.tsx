"use client"

import { Language, LanguageLevelWithLanguage } from "@/features/languages/types/languages.types"
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
import { showResponse } from "@/shared/lib/client-actions"
import { updateLanguageLevelsAction } from "../actions/language-levels-actions"

export function AddLanguageToLevelForm({
    level,
    currentLanguagesInLevel,
    languages
}: {
    level: Level,
    currentLanguagesInLevel: LanguageLevelWithLanguage[]
    languages: Language[]
}) {

    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<LanguageLevelInput>({
        resolver: zodResolver(languageLevelSchema),
        defaultValues: {
            languages: currentLanguagesInLevel.map(language => language.language.id)
        }
    })

    const onSubmit = async (data: LanguageLevelInput) => {
        showResponse(await updateLanguageLevelsAction(
            data,
            level.id
        ))
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
                                const isChecked = field.value?.includes(language.id) ?? false

                                const handleCheckedChange = (checked: boolean) => {
                                    const currentValue = field.value ?? []
                                    if (checked) {
                                        field.onChange([...currentValue, language.id])
                                    } else {
                                        field.onChange(
                                            currentValue.filter((id: string) => id !== language.id)
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
                                                {language.name}
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