"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PanelLeft } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "@/shared/components/ui/sidebar"
import { cn } from "@/shared/lib/utils"
import { isActive } from "@/shared/utils/pathname"

import { getUserDashboardNavigation } from "./constants"
import { User } from "@/features/users/types/user.types"

const navigationItemClassName =
    "p-2 flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-250"

export function DashboardSidebarNavigation({
    user
}: {
    user: User
}) {
    const { toggleSidebar, open } = useSidebar()
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                <SidebarMenuItem
                    className={navigationItemClassName}
                    onClick={toggleSidebar}
                >
                    <PanelLeft className="size-4" />
                    {open && "Cerrar menú"}
                </SidebarMenuItem>
                {getUserDashboardNavigation(user).map(item => {
                    const active = isActive(item, pathname)
                    return (
                        <SidebarMenuItem key={item.href}>
                            <Link
                                href={item.href}
                                className={cn(
                                    navigationItemClassName,
                                    active && "bg-primary text-primary-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4 shrink-0" />
                                {open && item.label}
                            </Link>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}