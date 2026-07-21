import { AdminGroupPage } from "@/features/groups/components/admin-group-page";
import { DetailGroupCard } from "@/features/groups/components/detail-group-card";
import { EditGroupFormCard } from "@/features/groups/components/forms-cards";
import { groupsService } from "@/features/groups/services/groups-service";
import { languageLevelService } from "@/features/levels/services/language-level-service";
import { UsersPolicies } from "@/features/users/policies/user-policies";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { notFound, redirect } from "next/navigation";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  const { groupId } = await params;
  const isAdmin = UsersPolicies.isAdmin(user);

  return (
    <>
      {isAdmin ? (
        <AdminGroupPage groupId={groupId} />
      ): (<p></p>)}
    </>
  );
}
