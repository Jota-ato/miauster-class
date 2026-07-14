"use server"

import { sellerAction } from "@/shared/lib/actions"
import { EditOwnUserInput, editOwnUserSchema } from "../schema/user-schema"
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