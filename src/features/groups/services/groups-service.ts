import { daysOfWeekEnum } from "@/db/schema";
import { GroupInput } from "../schemas/group-schema";
import { groupsRepository, IGroupsRepository } from "./groups-repository";
import {
  groupsSchedulesRepository,
  IGroupsSchedulesRepository,
} from "./groups-schedules-repository";
import {
  DetailedGroup,
  FullGroup,
  NewGroup,
  NewGroupSchedule,
} from "../types/groups.types";
import { format } from "date-fns";
import { AppError } from "@/shared/lib/errors";

class GroupsService {
  constructor(
    private groupsRepository: IGroupsRepository,
    private groupsSchedulesRepository: IGroupsSchedulesRepository,
  ) {}

  async getGroupById(id: string, full: true): Promise<FullGroup | null>;
  async getGroupById(id: string, full?: false): Promise<DetailedGroup | null>;
  async getGroupById(id: string, full?: boolean): Promise<DetailedGroup | null>;
  async getGroupById(id: string, full?: boolean) {
    return await this.groupsRepository.getById(id, full);
  }

  async getAllGroups(date: string) {
    return await this.groupsRepository.getAll(date);
  }

  async createGroup(data: GroupInput): Promise<void> {
    const payload: NewGroup = this.generateGroupPayload(data);
    const { id } = await this.groupsRepository.insert(payload);
    const slots: NewGroupSchedule[] = this.generateSlots(id, data);
    await this.groupsSchedulesRepository.insert(slots);
  }

  async updateGroup(groupId: string, data: GroupInput): Promise<void> {
    const dbGroup = await this.groupsRepository.getById(groupId);

    if (!dbGroup) {
      throw new AppError("Grupo no encontrado");
    }

    const payload: NewGroup = this.generateGroupPayload(data);
    const slots: NewGroupSchedule[] = this.generateSlots(groupId, data);

    await this.groupsSchedulesRepository.deleteByGroupId(groupId);
    await this.groupsRepository.update(groupId, payload);
    await this.groupsSchedulesRepository.insert(slots);
  }

  generateGroupPayload(data: GroupInput): NewGroup {
    return {
      ...data,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      weeklyPrice: data.weeklyPrice.toString(),
    };
  }

  generateSlots(groupId: string, data: GroupInput): NewGroupSchedule[] {
    return "slots" in data
      ? data.slots.map((slot) => ({
          groupId,
          dayOfWeek: slot.day,
          ...slot,
        }))
      : daysOfWeekEnum.enumValues.map((day) => ({
          groupId,
          dayOfWeek: day,
          startTime: data.startTime,
          endTime: data.endTime,
        }));
  }
}

export const groupsService = new GroupsService(
  groupsRepository,
  groupsSchedulesRepository,
);
