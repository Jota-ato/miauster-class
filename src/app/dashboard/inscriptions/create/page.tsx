import { groupsService } from "@/features/groups/services/groups-service";
import { CreateInscriptionCard } from "@/features/inscriptions/components/form-cards";
import { UsersPolicies } from "@/features/users/policies/user-policies";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { redirect } from "next/navigation";

export default async function CreateInscriptionPage() {
  const { user } = await requireAuth();

  if (!user) redirect("/auth/sign-in");
  if (!UsersPolicies.isSeller(user)) redirect("/not-authorized");
  const groups = await groupsService.getAllGroups(new Date().toISOString())

  return (
    <>
      <Heading>Nueva inscripción</Heading>
      <CreateInscriptionCard groups={groups} />
    </>
  );
}
