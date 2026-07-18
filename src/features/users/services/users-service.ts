import { AppError } from "@/shared/lib/errors";
import { User } from "../types/user.types";
import { IUsersRepository, usersRepository } from "./users-repository";
import { DELETE_USER_ID } from "@/shared/lib/env";

class UsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async findAllUsers() {
    return await this.usersRepository.findAll();
  }

  async findUserById(id: string) {
    return await this.usersRepository.findById(id);
  }

  async updateUser(
    id: string,
    editorId: string,
    data: Partial<Omit<User, "id">>,
  ) {
    const user = await this.usersRepository.findById(id);
    const editor = await this.usersRepository.findById(editorId);
    if (!user || !editor) {
      throw new AppError("Usuario no encontrado");
    }

    if (user.id !== editor.id && editor.role !== "admin") {
      throw new AppError("No tienes permisos para editar este usuario");
    }

    return await this.usersRepository.update(user.id, data);
  }

  async deleteUser(id: string, deleterId: string) {
    if (id === DELETE_USER_ID)
      throw new AppError("No puedes eliminar este usuario");
    const user = await this.usersRepository.findById(id);
    const deleter = await this.usersRepository.findById(deleterId);
    if (!user || !deleter) {
      throw new AppError("Usuario no encontrado");
    }

    if (user.id !== deleter.id && deleter.role !== "admin") {
      throw new AppError("No tienes permisos para eliminar este usuario");
    }

    // TODO: Change all invoices and enrollments to be assigned to the deleter user

    await this.usersRepository.delete(user.id);
  }
}

export const usersService = new UsersService(usersRepository);
