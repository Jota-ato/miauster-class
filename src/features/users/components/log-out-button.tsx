"use client"

import { signOut } from "@/lib/auth-client"
import { Button } from "@/shared/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function LogOutButton() {

    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const router = useRouter()
    const handleLogOut = async () => {
        setIsLoggingOut(true)
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Sesión cerrada correctamente")
                    router.push("/auth/sign-in")
                },
                onError: () => {
                    toast.error("Error al cerrar sesión")
                },
            },
        })
        setIsLoggingOut(false)
    }

    return (
        <Button
            className="flex items-center"
            variant="destructive"
            disabled={isLoggingOut}
            onClick={handleLogOut}
        >
            <LogOut className="size-4" /> Cerrar sesión
        </Button>
    )
}