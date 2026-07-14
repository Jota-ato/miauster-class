import { requireAuth } from "@/lib/auth-server"
import { ThemeToggle } from "@/shared/components/dashboard/theme-toggle"
import { Heading } from "@/shared/components/typography/heading"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/shared/components/ui/card"
import { redirect } from "next/navigation"

export default async function SettingsPage() {

    const { session } = await requireAuth()

    if (!session) redirect("/auth/sign-in")

    return (
        <>
            <Heading>
                Configuración
            </Heading>

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

                </CardContent>
            </Card>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>
                        Preferencias
                    </CardTitle>
                    <CardDescription>
                        Aquí puedes ver y actualizar tus preferencias
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <p>Tema</p>
                        <ThemeToggle />
                    </div>
                </CardContent>
            </Card>
        </>
    )
}