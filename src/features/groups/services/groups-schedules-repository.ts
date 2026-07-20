import { db } from "@/db";
import { NewGroupSchedule } from "../types/groups.types";
import { groupsSchedules } from "@/db/schema/groups-schedules";

export interface IGroupsSchedulesRepository {
  insert(data: NewGroupSchedule | NewGroupSchedule[]): Promise<void>;
}

class GroupsSchedulesRepository implements IGroupsSchedulesRepository {
  async insert(data: NewGroupSchedule | NewGroupSchedule[]): Promise<void> {
    if (Array.isArray(data)) {
      await db.insert(groupsSchedules).values(data);
      return;
    }
    await db.insert(groupsSchedules).values(data);
  }
}

export const groupsSchedulesRepository = new GroupsSchedulesRepository();
