"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/shared/components/ui/sidebar"
import { DashboardSidebarFooter } from "./sidebar/dashboard-sidebar-footer"
import { DashboardSidebarHeader } from "./sidebar/dashboard-sidebar-header"
import { DashboardSidebarNavigation } from "./sidebar/dashboard-sidebar-navigation"

export function DashboardSidebar() {

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
                <DashboardSidebarHeader />
            </SidebarHeader>
            <SidebarContent>
                <DashboardSidebarNavigation />
            </SidebarContent>
            <SidebarFooter className="p-4">
                <DashboardSidebarFooter />
            </SidebarFooter>
        </Sidebar>
    )
}