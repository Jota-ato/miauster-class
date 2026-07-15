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

export default function SignUpPage() {
    return (
        <Container className="space-y-8">
            <Heading>Registrarse</Heading>
            <Card className="max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Registrarse</CardTitle>
                    <CardDescription>
                        Crea una nueva cuenta para acceder a tu perfil.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CardAction>
                        <GoogleAuthButton
                            callbackURL="/waiting"
                        />
                    </CardAction>
                </CardContent>
            </Card>
            <div className="max-w-xl mx-auto -mt-6 flex items-center justify-end">
                <Link
                    href="/auth/sign-in"
                    className="text-sm text-muted-foreground hover:border-b border-accent-foreground transition-all duration-300"
                >
                    ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
            </div>
        </Container>
    )
}