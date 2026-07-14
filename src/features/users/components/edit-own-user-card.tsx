import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/shared/components/ui/card"
import { EditOwnUserForm } from "@/features/users/components/edit-own-user-form"
import { User } from "@/features/users/types/user.types"

export function EditOwnUserCard({
    user
}: {
    user: User
}) {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    Información de la cuenta
                </CardTitle>
                <CardDescription>
                    Aquí puedes ver y actualizar la información de tu cuenta, como tu nombre y correo electrónico. Asegúrate de mantener tus datos actualizados.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <EditOwnUserForm
                    user={user}
                />
            </CardContent>
        </Card>
    )
}