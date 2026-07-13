"use client"
import { User } from "@/features/users/types/user.types"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,

} from "@/shared/components/ui/dropdown-menu"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, useSidebar } from "@/shared/components/ui/sidebar"
import { ChevronsUpDown, LogOut } from "lucide-react"
import { signOut } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { UserData } from "./user-data"

export function DashboardSidebarFooter({
    user,
}: {
    user: User,
}) {

    const { open, isMobile } = useSidebar()
    

    return (
        <SidebarFooter>
            <SidebarMenu>
                <DropdownMenu >
                    <DropdownMenuTrigger
                        render={<SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-between items-center gap-2 w-full"
                        />}
                    >
                        <UserData 
                            user={user}
                            imageOnly={!open}
                        />
                        {open && <ChevronsUpDown />}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side={isMobile ? "top" : "right"}
                        align="end"
                        sideOffset={14}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                Ajustes de cuenta
                            </DropdownMenuLabel>
                            <DropdownMenuItem>
                                Configuración
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => {
                                    signOut()
                                    redirect("/auth/sign-in")
                                }}
                            >
                                <LogOut />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenu>
        </SidebarFooter>
    )
}