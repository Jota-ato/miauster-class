import { db } from "@/db"
import { User } from "../types/user.types"

export interface IUsersRepository {
    findAll(): Promise<User[]>
}

class UsersRepository implements IUsersRepository {
    async findAll(): Promise<User[]> {
        return await db
            .query
            .user
            .findMany()
    }
}

export const usersRepository = new UsersRepository()