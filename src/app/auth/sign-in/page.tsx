import GoogleAuthButton from "@/features/auth/components/google-auth-button";
import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card"
import Link from "next/link";

export default function SignInPage() {
    return (
        <Container className="space-y-8">
            <Heading>Iniciar sesión</Heading>
            <Card className="max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Iniciar sesión</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales para acceder a tu cuenta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CardAction>
                        <GoogleAuthButton />
                    </CardAction>
                </CardContent>
            </Card>
            <div className="max-w-xl mx-auto -mt-6 flex items-center justify-end">
                <Link
                    href="/auth/sign-up"
                    className="text-sm text-muted-foreground hover:border-b border-accent-foreground transition-all duration-300"
                >
                    ¿No tienes una cuenta? Registrarse
                </Link>
            </div>
        </Container>
    )
}