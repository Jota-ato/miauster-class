"use client"
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
import { PenSquare, Settings, Trash } from "lucide-react"
import { rolesTranslatedMap } from "@/shared/utils/roles"
import { useUsersStore } from "../stores/users-store"
import { cn } from "@/shared/lib/utils"
import Link from "next/link"

export function UsersTable({
    users,
    currentUser
}: {
    users: User[]
    currentUser: User
}) {

    const {
        setActiveUser,
        setOpenEditSheet,
        setOpenDeleteDialog
    } = useUsersStore()

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
                        <TableRow
                            key={user.id}
                            className={cn(currentUser.id === user.id && "bg-muted")}
                        >
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
                                {(user.id !== currentUser.id) ? (
                                    <>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => {
                                                setActiveUser(user)
                                                setOpenEditSheet(true)
                                            }}
                                            aria-label="Editar usuario"
                                        >
                                            <PenSquare />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => {
                                                setActiveUser(user)
                                                setOpenDeleteDialog(true)
                                            }}
                                            aria-label="Eliminar usuario"
                                        >
                                            <Trash />
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        aria-label="Configuración"
                                        render={<Link href="/dashboard/settings" />}
                                        nativeButton={false}
                                    >
                                        <Settings />
                                    </Button>
                                )}
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