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
import { LevelsTable } from "@/features/levels/components/levels-table";

export default async function LevelsPage() {

    const { session, user } = await requireAuth()

    if (!session || !user) redirect("/auth/sign-in")

    const levels = await levelsService.getAllLevels(true)
    console.log(levels)

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
                    {levels.length ? (
                        <LevelsTable 
                            levels={levels}
                        />
                    ): (
                        <p>No hay niveles disponibles en este momento.</p>
                    )}
                </CardContent>
            </Card>
        </>
    )
}