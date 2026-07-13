import { UserData } from "@/shared/components/dashboard/sidebar/user-data"
import { User } from "../types/user.types"
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableCell,
    TableRow
} from "@/shared/components/ui/table"
import { Button } from "@/shared/components/ui/button"
import { PenSquare, Trash } from "lucide-react"
import { rolesTranslatedMap } from "@/shared/utils/roles"

export function UsersTable({
    users
}: {
    users: User[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Usuario
                    </TableHead>
                    <TableHead>
                        Ventas este mes
                    </TableHead>
                    <TableHead>
                        Rol
                    </TableHead>
                    <TableHead>
                        Acciones
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length ? (
                    users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <UserData user={user} />
                            </TableCell>
                            <TableCell>
                                10
                            </TableCell>
                            <TableCell>
                                {rolesTranslatedMap[user.role]}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                >
                                    <PenSquare />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                >
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <p>No hay usuarios</p>
                )}
            </TableBody>
        </Table>
    )
}