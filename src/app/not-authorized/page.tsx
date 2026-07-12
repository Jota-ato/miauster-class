import Link from "next/link"
import {
    ArrowLeft,
    Home,
    ShieldAlert,
    LogIn
} from "lucide-react"

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
import { Container } from "@/shared/components/layout/container"

export default function NotAuthorizedPage() {
    return (
        <Container className="flex items-center justify-center min-h-screen py-8 md:py-12">
            <Card className="max-w-2xl w-full mx-auto">
                <CardHeader>
                    <CardTitle>
                        <Heading className="text-center text-xl! md:text-2xl! font-normal!">¡Ops! No tienes acceso a esta sección</Heading>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ShieldAlert className="size-20 p-2 mx-auto rounded-full bg-amber-400 dark:bg-amber-900/40 stroke-amber-900 dark:stroke-amber-300" />
                    <p className="text-center max-w-xl mx-auto my-8 text-base">
                        Parece que no tienes los permisos necesarios para acceder a esta sección. Si crees que esto es un error, por favor contacta con el administrador del sistema para obtener ayuda.
                    </p>
                </CardContent>
                <CardFooter className="md:justify-evenly">
                    <Button
                        render={<Link href="/" />}
                        nativeButton={false}
                        variant="outline"
                        size="lg"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la página principal
                    </Button>
                    <Button
                        render={<Link href="/auth/sign-in" />}
                        nativeButton={false}
                        size="lg"
                    >
                        <LogIn className="w-4 h-4" />
                        Inicia sesión en una cuenta diferente
                    </Button>
                </CardFooter>
            </Card>
        </Container>
    )
}