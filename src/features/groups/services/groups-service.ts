import { daysOfWeekEnum } from "@/db/schema";
import { GroupInput, SlotInput } from "../schemas/group-schema";
import { groupsRepository, IGroupsRepository } from "./groups-repository";
import {
  groupsSchedulesRepository,
  IGroupsSchedulesRepository,
} from "./groups-schedules-repository";
import { NewGroup, NewGroupSchedule } from "../types/groups.types";
import { format } from "date-fns";

class GroupsService {
  constructor(
    private groupsRepository: IGroupsRepository,
    private groupsSchedulesRepository: IGroupsSchedulesRepository,
  ) {}

  async createGroup(data: GroupInput): Promise<void> {
    const payload: NewGroup = {
      ...data,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      weeklyPrice: data.weeklyPrice.toString(),
    };

    const { id } = await this.groupsRepository.insert(payload);

    const slots: NewGroupSchedule[] =
      "slots" in data
        ? data.slots.map((slot) => ({
            groupId: id,
            dayOfWeek: slot.day,
            ...slot,
          }))
        : daysOfWeekEnum.enumValues.map((day) => ({
            groupId: id,
            dayOfWeek: day,
            startTime: data.startTime,
            endTime: data.endTime,
          }));

    await this.groupsSchedulesRepository.insert(slots);
  }
}

export const groupsService = new GroupsService(
  groupsRepository,
  groupsSchedulesRepository,
);
