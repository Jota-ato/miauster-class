"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetDescription
} from "@/shared/components/ui/sheet";
import { useUsersStore } from "../stores/users-store";

export function EditSheet() {

    const {
        setOpenEditSheet,
        openEditSheet,
        activeUser,
        setActiveUser
    } = useUsersStore()

    if (!activeUser) return null

    return (
        <Sheet open={openEditSheet} onOpenChange={() => {
            setOpenEditSheet(false)
            setActiveUser(null)
        }}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        Editar usuario
                    </SheetTitle>
                    <SheetDescription>
                        Editar la información del usuario {activeUser.name}
                        <strong>
                            {" "}({activeUser.email})
                        </strong>
                    </SheetDescription>
                </SheetHeader>
                contenido
                <SheetFooter>
                    Footer
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}