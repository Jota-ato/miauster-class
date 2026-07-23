import { groupsService } from "@/features/groups/services/groups-service";
import { DetailInscriptionCard } from "@/features/inscriptions/components/detailed-inscription-card";
import { EditInscriptionCard } from "@/features/inscriptions/components/form-cards";
import { inscriptionService } from "@/features/inscriptions/services/inscriptions-service";
import { requireAuth } from "@/lib/auth-server";
import { EditableToggleCard } from "@/shared/components/dashboard/editable-toggle-card";
import { Heading } from "@/shared/components/typography/heading";
import { format } from "date-fns";
import { notFound, redirect } from "next/navigation";

export default async function InscriptionPage({
  params,
}: {
  params: Promise<{ inscriptionId: string }>;
}) {
  const { user } = await requireAuth();

  if (!user) redirect("/auth/sign-in");
  const today = new Date();
  const { inscriptionId } = await params;
  const inscription = await inscriptionService.getById(inscriptionId, user.id);
  if (!inscription) notFound();
  const groups = await groupsService.getAllGroups(format(today, "yyyy-MM-dd"));

  return (
    <>
      <Heading>Inscripción de {inscription.studentNameSnapshot}</Heading>
      <EditableToggleCard
        viewComponent={<DetailInscriptionCard inscription={inscription} />}
        editComponent={
          <EditInscriptionCard
            groups={groups}
            userId={user.id}
            inscription={inscription}
          />
        }
      />
    </>
  );
}
