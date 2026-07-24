import { groupsService } from "@/features/groups/services/groups-service";
import { CreateInscriptionCard } from "@/features/inscriptions/components/form-cards";
import { languagesService } from "@/features/languages/services/languages-service";
import { languageLevelService } from "@/features/levels/services/language-level-service";
import { UsersPolicies } from "@/features/users/policies/user-policies";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { redirect } from "next/navigation";

export default async function CreateInscriptionPage() {
  const { user } = await requireAuth();

  if (!user) redirect("/auth/sign-in");
  if (!UsersPolicies.isSeller(user)) redirect("/not-authorized");
  const groups = await groupsService.getAllGroups(new Date().toISOString())
  const languageLevels = await languagesService.getAllLanguages()

  return (
    <>
      <Heading>Nueva inscripción</Heading>
      <CreateInscriptionCard groups={groups} userId={user.id} languages={languageLevels} />
    </>
  );
}
