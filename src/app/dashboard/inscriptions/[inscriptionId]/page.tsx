import { DetailInscriptionCard } from "@/features/inscriptions/components/detailed-inscription-card";
import { inscriptionService } from "@/features/inscriptions/services/inscriptions-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { notFound, redirect } from "next/navigation";

export default async function InscriptionPage({
  params,
}: {
  params: Promise<{ inscriptionId: string }>;
}) {
  const { user } = await requireAuth();

  if (!user) redirect("/auth/sign-in");

  const { inscriptionId } = await params;
  const inscription = await inscriptionService.getById(inscriptionId, user.id);
  if (!inscription) notFound();

  return (<>
    <Heading>Inscripción de {inscription.studentNameSnapshot}</Heading>
    <DetailInscriptionCard inscription={inscription} />
  </>);
}
