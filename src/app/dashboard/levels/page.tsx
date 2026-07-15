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
import { levelsService } from "@/features/levels/services/levels-service";

export default async function LevelsPage() {

    const { session, user } = await requireAuth()

    if (!session || !user) redirect("/auth/sign-in")

    const levels = await levelsService.getAllLevels(true)

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
                    render={<Link href="/dashboard/levels/add" />}
                    nativeButton={false}
                >
                    Agregar nivel
                </Button>
            )}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Niveles
                    </CardTitle>
                    <CardDescription>
                        Aquí puedes ver los niveles disponibles en la plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Contenido de los niveles.
                    </p>
                </CardContent>
            </Card>
        </>
    )
}