"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/shared/components/ui/alert-dialog"
import { useUsersStore } from "../stores/users-store"
import { User } from "../types/user.types"
import { showResponse } from "@/shared/lib/client-actions"
import { deleteUserAction } from "../actions/user-actions"
import { useState } from "react"
import { Spinner } from "@/shared/components/ui/spinner"

export function DeleteUserDialog({
    currentUser
}: {
    currentUser: User
}) {

    const {
        activeUser,
        setActiveUser,
        openDeleteDialog,
        setOpenDeleteDialog
    } = useUsersStore()
    const [isDeleting, setIsDeleting] = useState(false)

    if (!activeUser) return null

    const deleteAction = async () => {
        showResponse(await deleteUserAction(activeUser.id, currentUser.id))
    }

    return (
        <AlertDialog open={openDeleteDialog} onOpenChange={() => {
            setActiveUser(null)
            setOpenDeleteDialog(false)
        }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás seguro de que deseas eliminar al usuario {activeUser.name}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Las inscripciones realizadas por  el usuario se conservarán.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deleteAction}
                    >
                        {isDeleting ? <span className="flex items-center gap-2"><Spinner />Eliminando...</span> : "Eliminar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}