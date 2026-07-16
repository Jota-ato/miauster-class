import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/shared/components/ui/card";
import { LanguageForm } from "./language-form";
import { Language } from "../types/languages.types";

export function EditLanguageCard({
    language
}: {
    language: Language
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar idioma</CardTitle>
                <CardDescription>
                    Editar información del idioma.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LanguageForm />
            </CardContent>
        </Card>
    )
}