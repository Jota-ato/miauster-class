import { db } from "@/db";
import {
  DetailedGroup,
  FullGroup,
  Group,
  NewGroup,
  UpdateGroup,
} from "../types/groups.types";
import { groups } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export interface IGroupsRepository {
  getById(id: string, full: true): Promise<FullGroup | null>;
  getById(id: string, full?: false): Promise<DetailedGroup | null>;
  getById(id: string, full?: boolean): Promise<DetailedGroup | null>;
  getAll(date: string): Promise<DetailedGroup[]>;
  insert(group: NewGroup): Promise<Group>;
  update(id: string, data: UpdateGroup): Promise<void>
}

class GroupsRepository implements IGroupsRepository {
  async getById(id: string, full: true): Promise<FullGroup | null>;
  async getById(id: string, full?: false): Promise<DetailedGroup | null>;
  async getById(id: string, full?: boolean): Promise<DetailedGroup | null>;
  async getById(
    id: string,
    full: boolean = false,
  ): Promise<DetailedGroup | null> {
    return (
      (await db.query.groups.findFirst({
        where: (groups, { eq }) => eq(groups.id, id),
        with: {
          schedules: true,
          studentsGroups: full ? { with: { student: true } } : undefined,
          languageLevel: { with: { language: true, level: true } },
        },
        extras: (groups) => ({
          leftSpots: sql<number>`
            ${groups.maxStudents} - (
              select count(*)::int
              from students_groups
              where students_groups.group_id = ${groups.id}
            )
          `.as("left_spots"),
        }),
      })) || null
    );
  }

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
      extras: (groups) => ({
        leftSpots: sql<number>`
          ${groups.maxStudents} - (
            select count(*)::int
            from students_groups
            where students_groups.group_id = ${groups.id}
          )
        `.as("left_spots"),
      }),
    });
  }

  async insert(group: NewGroup): Promise<Group> {
    return (await db.insert(groups).values(group).returning())[0];
  }

  async update(id: string, data: UpdateGroup): Promise<void> {
    await db
      .update(groups)
      .set(data)
      .where(eq(groups.id, id));
  }
}

export const groupsRepository = new GroupsRepository();