import { AppError } from "@/shared/lib/errors";
import { User } from "../types/user.types";
import { IUsersRepository, usersRepository } from "./users-repository";

class UsersService {
    constructor(
        private usersRepository: IUsersRepository
    ) { }

    async findAllUsers() {
        return await this.usersRepository.findAll()
    }

    async findUserById(id: string) {
        return await this.usersRepository.findById(id)
    }

    async updateUser(
        id: string,
        editorId: string,
        data: Partial<Omit<User, "id">>
    ) {

        const user = await this.usersRepository.findById(id)
        const editor = await this.usersRepository.findById(editorId)
        if (!user || !editor) {
            throw new AppError("Usuario no encontrado")
        }

        if ((user.id !== editor.id) && (editor.role !== "admin")) {
            throw new AppError("No tienes permisos para editar este usuario")
        }

        return await this.usersRepository.update(user.id, data)
    }
}

export const usersService = new UsersService(
    usersRepository
)