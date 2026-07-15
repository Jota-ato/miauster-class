import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GroupsPage() {

  const { session, user } = await requireAuth()

  if (!session || !user) redirect("/auth/sign-in")

  return (
    <>
      <Heading>
        Grupos
      </Heading>
      {user.role === "admin" && (
        <Button
          className="my-4"
          size="lg"
          variant="link"
          render={<Link href="/dashboard/groups/create" />}
          nativeButton={false}
        >
          Crear Grupo
        </Button>
      )}
      <Card>
        <CardHeader>
          <CardTitle>
            Grupos disponibles
          </CardTitle>
          <CardDescription>
            Aquí puedes ver todos los grupos activos, puedes buscar por nombre, idioma, nivel y horario.
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}