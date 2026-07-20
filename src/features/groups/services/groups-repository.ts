import { db } from "@/db";
import { DetailedGroup, Group, NewGroup } from "../types/groups.types";
import { groups } from "@/db/schema";

export interface IGroupsRepository {
  getAll(date: string): Promise<DetailedGroup[]>;
  insert(group: NewGroup): Promise<Group>;
}

class GroupsRepository implements IGroupsRepository {
  async getAll(date: string): Promise<DetailedGroup[]> {
    return await db.query.groups.findMany({
      where: (groups, { gte }) => gte(groups.startDate, date),
      with: {
        schedules: true,
        languageLevel: {
          with: {
            language: true,
            level: true,
          },
        },
      },
    });
  }

  async insert(group: NewGroup): Promise<Group> {
    return (await db.insert(groups).values(group).returning())[0];
  }
}

export const groupsRepository = new GroupsRepository();
