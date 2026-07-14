import { Button } from "@/shared/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/shared/components/ui/card"
import { LogOut, Trash } from "lucide-react"
import { DeleteOwnUser } from "./delete-own-user"
import { User } from "../types/user.types"
import { LogOutButton } from "./log-out-button"

export function DangerActionsCard({
    user
}: {
    user: User
}) {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    Zona de peligro
                </CardTitle>
                <CardDescription>
                    Acciones que requieren precaución, como eliminar tu cuenta. Estas acciones no se pueden deshacer, así que ten cuidado al realizarlas.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center gap-4">
                    <LogOutButton />
                    <DeleteOwnUser
                        user={user}
                    />
                </div>
            </CardContent>
        </Card>
    )
}