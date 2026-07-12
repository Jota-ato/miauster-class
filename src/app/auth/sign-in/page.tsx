import GoogleAuthButton from "@/features/auth/components/google-auth-button";
import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card"

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
        </Container>
    )
}