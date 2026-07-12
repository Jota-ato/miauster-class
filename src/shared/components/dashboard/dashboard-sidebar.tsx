"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    useSidebar,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem
} from "@/shared/components/ui/sidebar"
import { Heading } from "../typography/heading"
import Link from "next/link"
import { dashboardNavigation } from "./sidebar/constants"
import { isActive } from "@/shared/utils/pathname"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/lib/utils"

export function DashboardSidebar() {

    const {
        toggleSidebar,
        open
    } = useSidebar()
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
                <Heading className="text-lg! md:text-xl!">
                    {open ? "Miauster" : "M"}
                </Heading>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Navegación
                    </SidebarGroupLabel>
                    <SidebarMenu className="space-y-1">
                        {dashboardNavigation.map(item => {
                            const active = isActive(item, pathname)
                            return (
                                <SidebarMenuItem
                                    key={item.href}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "p-2 flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-250",
                                            active && "bg-primary text-primary-foreground"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4 shrink-0" />
                                        {item.label}
                                    </Link>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                Footer content
            </SidebarFooter>
        </Sidebar>
    )
}