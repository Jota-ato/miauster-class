"use server";

import { adminAction } from "@/shared/lib/actions";
import { GroupInput, groupSchema } from "../schemas/group-schema";
import { AppError } from "@/shared/lib/errors";
import { groupsService } from "../services/groups-service";
import { differenceInDays } from "date-fns";
import { getGroupStartMessage } from "@/shared/utils/date";

export const createGroupAction = adminAction(async (data: GroupInput) => {
  const zodResponse = groupSchema.safeParse(data);

  if (!zodResponse.success) {
    throw new AppError("Datos inválidos");
  }

  await groupsService.createGroup(data);
  const startMessage = getGroupStartMessage(data.startDate);
  return `Grupo ${data.name} creado correctamente, ${startMessage}`;
});
