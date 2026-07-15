import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card"
import { LevelForm } from "@/features/levels/components/level-form"
import { Level } from "../types/levels.types"

export function EditLevelCard({
    level
}: {
    level: Level
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar nivel</CardTitle>
                <CardDescription>Modifica los detalles del nivel</CardDescription>
            </CardHeader>
            <CardContent>
                <LevelForm
                    level={level}
                />
            </CardContent>
        </Card>
    )
}