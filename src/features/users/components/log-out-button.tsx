"use client"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { signOut } from "@/lib/auth-client"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

export function LogOutButton({
    className,
    variant = "destructive",
    size = "default",
    ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {

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
            className={cn("flex items-center", className)}
            variant={variant}
            size={size}
            disabled={isLoggingOut}
            onClick={handleLogOut}
            {...props}
        >
            <LogOut className="size-4" /> Cerrar sesión
        </Button>
    )
}