import { GroupsTable } from "@/features/groups/components/groups-table";
import { groupsService } from "@/features/groups/services/groups-service";
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
import { format, startOfMonth } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GroupsPage() {
  const { session, user } = await requireAuth();

  if (!session || !user) redirect("/auth/sign-in");

  const month = startOfMonth(new Date());
  const groups = await groupsService.getAllGroups(format(month, "yyyy-MM-dd"));

  return (
    <>
      <Heading>Grupos</Heading>
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
          <CardTitle>Grupos disponibles</CardTitle>
          <CardDescription>
            Aquí puedes ver todos los grupos activos, puedes buscar por nombre,
            idioma, nivel y horario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GroupsTable groups={groups} />
        </CardContent>
      </Card>
    </>
  );
}
