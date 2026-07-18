import { db } from "@/db";
import { User } from "../types/user.types";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DELETE_USER_ID } from "@/shared/lib/env";

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<Omit<User, "id">>): Promise<User>;
  delete(id: string): Promise<void>;
}

class UsersRepository implements IUsersRepository {
  async findAll(): Promise<User[]> {
    return await db.query.user.findMany({
      where: (user, { not, eq }) => not(eq(user.id, DELETE_USER_ID!)),
    });
  }

  async findById(id: string): Promise<User | null> {
    return (
      (await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, id),
      })) || null
    );
  }

  async update(id: string, data: Partial<Omit<User, "id">>): Promise<User> {
    return (
      await db
        .update(user)
        .set({
          ...data,
        })
        .where(eq(user.id, id))
        .returning()
    )[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(user).where(eq(user.id, id));
  }
}

export const usersRepository = new UsersRepository();
