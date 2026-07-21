import { notFound } from "next/navigation";
import { groupsService } from "../services/groups-service";
import { Heading } from "@/shared/components/typography/heading";
import { DetailGroupCard } from "./detail-group-card";

export async function SellerGroupPage({ groupId }: { groupId: string }) {
  const group = await groupsService.getGroupById(groupId);
  if (!group) notFound();

  return (
    <>
        <Heading>{group.name}</Heading>
        <DetailGroupCard 
            group={group}
        />
    </>
  );
}
