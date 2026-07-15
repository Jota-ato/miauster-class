import { LogOutButton } from "@/features/users/components/log-out-button"
import { requireAuth } from "@/lib/auth-server"
import { Container } from "@/shared/components/layout/container"
import { Button } from "@/shared/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { Heading } from "@/shared/components/typography/heading"
import { ArrowLeft, Clock3 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function WaitingPage() {
    const { session, user } = await requireAuth()

    if (!session || !user) redirect("/auth/sign-in")

    if (user.role !== "waiting") redirect("/dashboard")

    return (
        <Container className="space-y-8 py-8 md:py-12">
            <Card className="max-w-2xl w-full mx-auto">
                <CardHeader>
                    <CardTitle>
                        <Heading className="text-center text-xl! md:text-2xl! font-normal!">
                            ¡Tu cuenta está en espera de aprobación!
                        </Heading>
                    </CardTitle>
                    <CardDescription className="text-center">
                        Tu acceso todavía no está activo. La administración revisará tu cuenta y, en cuanto se apruebe, podrás entrar con normalidad.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Clock3 className="size-20 p-2 mx-auto rounded-full bg-sky-400 dark:bg-sky-900/40 stroke-sky-900 dark:stroke-sky-300" />
                    <p className="text-center max-w-xl mx-auto my-8 text-base">
                        Mientras tanto, puedes volver al inicio o cerrar sesión si prefieres entrar con otra cuenta más tarde.
                    </p>
                </CardContent>
                <CardFooter className="md:justify-evenly flex-col md:flex-row gap-4">
                    <Button
                        render={<Link href="/" />}
                        nativeButton={false}
                        variant="outline"
                        size="lg"
                        className="w-full md:w-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la página principal
                    </Button>
                    <LogOutButton
                        size="lg"
                        className="w-full md:w-auto"
                    />
                </CardFooter>
            </Card>
        </Container>
    )
}