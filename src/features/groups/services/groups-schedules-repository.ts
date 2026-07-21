import { db } from "@/db";
import { NewGroupSchedule } from "../types/groups.types";
import { groupsSchedules } from "@/db/schema/groups-schedules";
import { eq } from "drizzle-orm";

export interface IGroupsSchedulesRepository {
  insert(data: NewGroupSchedule | NewGroupSchedule[]): Promise<void>;
  deleteByGroupId(groupId: string): Promise<void>;
}

class GroupsSchedulesRepository implements IGroupsSchedulesRepository {
  async insert(data: NewGroupSchedule | NewGroupSchedule[]): Promise<void> {
    if (Array.isArray(data)) {
      await db.insert(groupsSchedules).values(data);
      return;
    }
    await db.insert(groupsSchedules).values(data);
  }

  async deleteByGroupId(groupId: string): Promise<void> {
    await db
      .delete(groupsSchedules)
      .where(eq(groupsSchedules.groupId, groupId));
  }
}

export const groupsSchedulesRepository = new GroupsSchedulesRepository();
