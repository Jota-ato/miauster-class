"use client"
import {
    Sidebar,
    SidebarContent,
} from "@/shared/components/ui/sidebar"
import { DashboardSidebarFooter } from "./sidebar/dashboard-sidebar-footer"
import { DashboardSidebarHeader } from "./sidebar/dashboard-sidebar-header"
import { DashboardSidebarNavigation } from "./sidebar/dashboard-sidebar-navigation"
import { User } from "@/features/users/types/user.types"

export function DashboardSidebar({
    user
}: {
    user: User
}) {

    return (
        <Sidebar collapsible="icon">
            <DashboardSidebarHeader />
            <SidebarContent>
                <DashboardSidebarNavigation 
                    user={user}
                />
            </SidebarContent>
            <DashboardSidebarFooter
                user={user}
            />
        </Sidebar>
    )
}