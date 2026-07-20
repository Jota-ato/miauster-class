import { db } from "@/db";
import { Group, NewGroup } from "../types/groups.types";
import { groups } from "@/db/schema";

export interface IGroupsRepository {
  insert(group: NewGroup): Promise<Group>;
}

class GroupsRepository implements IGroupsRepository {
  async insert(group: NewGroup): Promise<Group> {
    return (await db.insert(groups).values(group).returning())[0];
  }
}

export const groupsRepository = new GroupsRepository();
