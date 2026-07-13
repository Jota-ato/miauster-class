import { User } from "@/features/users/types/user.types";

export const rolesTranslatedMap: Record<User["role"], string> = {
    admin: "Administrador",
    seller: "Vendedor",
    waiting: "En espera",
}