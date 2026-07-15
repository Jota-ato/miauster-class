import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { redirect } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/shared/components/ui/card";
import Link from "next/link";

export default async function LevelsPage() {

    const { session, user } = await requireAuth()

    if (!session || !user) redirect("/auth/sign-in")

    return (
        <>
            <Heading>
                Niveles
            </Heading>

            {user.role === "admin" && (
                <Button
                    className="my-4"
                    size="lg"
                    variant="link"
                    render={<Link href="/dashboard/languages/add" />}
                    nativeButton={false}
                >
                    Agregar idioma
                </Button>
            )}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Idiomas
                    </CardTitle>
                    <CardDescription>
                        Aquí puedes ver los idiomas disponibles en la plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Contenido de los idiomas.
                    </p>
                </CardContent>
            </Card>
        </>
    )
}