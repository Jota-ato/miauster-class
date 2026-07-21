import { groupsService } from "@/features/groups/services/groups-service";
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
  const group = await groupsService.getGroupById(groupId, isAdmin);

  if (!group) notFound();

  return (
    <>
      <Heading>Grupo: {group.name}</Heading>
    </>
  );
}
