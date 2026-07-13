import { IUsersRepository, usersRepository } from "./users-repository";

class UsersService {
    constructor(
        private usersRepository: IUsersRepository
    ) { }

    async findAllUsers() {
        return await this.usersRepository.findAll()
    }
}

export const usersService = new UsersService(
    usersRepository
)