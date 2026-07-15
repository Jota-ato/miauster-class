import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/shared/components/ui/card";
import { LanguageForm } from "./language-form";

export function AddLanguageCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Agregar idioma</CardTitle>
                <CardDescription>
                    Agrega un nuevo idioma a la plataforma para que los usuarios puedan acceder a él.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LanguageForm />
            </CardContent>
        </Card>
    )
}