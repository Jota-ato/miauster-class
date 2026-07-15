import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/shared/components/ui/card";
import { LevelForm } from "./level-form";

export function AddLevelCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Agregar nivel</CardTitle>
                <CardDescription>
                    Agrega un nuevo nivel a la plataforma para que los usuarios puedan acceder a él.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LevelForm />
            </CardContent>
        </Card>
    )
}