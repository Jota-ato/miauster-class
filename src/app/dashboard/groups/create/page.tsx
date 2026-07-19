import { CreateGroupFormCard } from "@/features/groups/components/forms-cards";
import { languageLevelService } from "@/features/levels/services/language-level-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { redirect } from "next/navigation";

export default async function CreateGroupPage() {
  const { session, user } = await requireAuth();

  if (!session || !user) redirect("/auth/sign-in");
  if (user.role !== "admin") redirect("/not-authorized");
  const languageLevels = await languageLevelService.getAllLanguageLevels(true);

  return (
    <>
      <Heading>Crear grupo</Heading>
      <CreateGroupFormCard languageLevels={languageLevels} />
    </>
  );
}
