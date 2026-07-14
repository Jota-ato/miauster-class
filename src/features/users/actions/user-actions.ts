"use server"

import { adminAction, sellerAction } from "@/shared/lib/actions"
import { EditOwnUserInput, editOwnUserSchema, EditUserInput, editUserSchema } from "../schema/user-schema"
import { AppError } from "@/shared/lib/errors"
import { usersService } from "../services/users-service"

export const editOwnUserAction = sellerAction(async (
    data: EditOwnUserInput,
    userId: string
) => {
    const zodResult = editOwnUserSchema.safeParse(data)
    if (!zodResult.success) {
        throw new AppError("Datos inválidos")
    }

    await usersService.updateUser(
        userId,
        userId,
        zodResult.data
    )

    return "Actualizaste tus datos correctamente"
})

export const editUserAction = adminAction(async (
    userId: string,
    editorId: string,
    data: EditUserInput
) => {
    const zodResult = editUserSchema.safeParse(data)
    if (!zodResult.success) {
        throw new AppError("Datos inválidos")
    }

    await usersService.updateUser(
        userId,
        editorId,
        zodResult.data
    )

    return "Usuario actualizado correctamente"
})

export const deleteOwnUserAction = sellerAction(async (
    userId: string,
    deleterId: string
) => {
    await usersService.deleteUser(
        userId,
        deleterId
    )

    return "Eliminaste tu cuenta correctamente"
})
export const deleteUserAction = adminAction(async (
    userId: string,
    deleterId: string
) => {
    await usersService.deleteUser(
        userId,
        deleterId
    )

    "Usuario eliminado correctamente"
})