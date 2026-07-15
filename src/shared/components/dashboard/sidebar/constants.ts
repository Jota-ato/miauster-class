import type { Route } from "next"
import {
    BookUser,
    FolderKanban,
    Home,
    Users,
    Languages
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { User } from "@/features/users/types/user.types"

export type DashboardNavigationItem = {
    label: string,
    href: Route,
    icon: LucideIcon
}

export const dashboardNavigation: DashboardNavigationItem[] = [
    {
        label: "Inicio",
        href: "/dashboard",
        icon:  Home
    },
    {
        label: "Inscripciones",
        href: "/dashboard/inscriptions",
        icon: BookUser
    },
    {
        label: "Grupos",
        href: "/dashboard/groups",
        icon: FolderKanban
    },
    {
        label: "Idiomas",
        href: "/dashboard/languages",
        icon: Languages
    },
    {
        label: "Usuarios",
        href: "/dashboard/users",
        icon: Users
    }
]

export const getUserDashboardNavigation = (user: User) => {
    if (user.role === "admin") {
        return dashboardNavigation
    }
    if (user.role === "seller") {
        return dashboardNavigation.filter(item => item.href !== "/dashboard/users")
    }
    else {
        return []
    }
}