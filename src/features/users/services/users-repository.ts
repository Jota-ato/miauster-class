import { db } from "@/db"
import { User } from "../types/user.types"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"

export interface IUsersRepository {
    findAll(): Promise<User[]>
    findById(id: string): Promise<User | null>
    update(id: string, data: Partial<Omit<User, "id">>): Promise<User>
}

class UsersRepository implements IUsersRepository {
    async findAll(): Promise<User[]> {
        return await db
            .query
            .user
            .findMany()
    }

    async findById(id: string): Promise<User | null> {
        return await db
            .query
            .user
            .findFirst({
                where: (user, { eq }) => eq(user.id, id)
            }) || null
    }

    async update(id: string, data: Partial<Omit<User, "id">>): Promise<User> {
        return (await db
            .update(user)
            .set({
                ...data
            })
            .where(eq(user.id, id))
            .returning()
        )[0]
    }
}

export const usersRepository = new UsersRepository()