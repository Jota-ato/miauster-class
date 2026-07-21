import { notFound } from "next/navigation";
import { groupsService } from "../services/groups-service";
import { Heading } from "@/shared/components/typography/heading";
import { EditGroupFormCard } from "./forms-cards";
import { languageLevelService } from "@/features/levels/services/language-level-service";
import { GroupCardToggle } from "./admin-group-page-components";

export async function AdminGroupPage({
    groupId
}: {
    groupId: string
}) {

    const group = await groupsService.getGroupById(groupId, true);
    const languageLevels = await languageLevelService.getAllLanguageLevels(true)
    if (!group) notFound()

  return (
    <>
      <Heading>Grupo: {group.name}</Heading>

      <GroupCardToggle 
        group={group}
        languageLevels={languageLevels}
      />
    </>
  )
}