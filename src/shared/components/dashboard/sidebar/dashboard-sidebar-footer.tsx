"use client"
import { User } from "@/features/users/types/user.types"
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/shared/components/ui/avatar"
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

export function DashboardSidebarFooter({
    user,
}: {
    user: User,
}) {

    const { open, isMobile } = useSidebar()
    const image = user.image ? user.image : "/img/default-avatar.png"
    const firstName = user.name.split(" ")[0]

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
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage
                                    src={image}
                                />
                                <AvatarFallback>
                                    {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {open && (
                                <div>
                                    <p className="text-sm font-semibold">{firstName}</p>
                                    <p className="text-xs">{user.email}</p>
                                </div>
                            )}
                        </div>
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
                            <DropdownMenuItem>
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