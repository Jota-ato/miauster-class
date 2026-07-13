"use client"

import {
    useSidebar,
    SidebarHeader
} from "@/shared/components/ui/sidebar"
import { Heading } from "@/shared/components/typography/heading"

export function DashboardSidebarHeader() {
    const { open } = useSidebar()

    return (
        <SidebarHeader>
            <Heading className="text-lg! md:text-xl!">
                {open ? "Miauster class" : "M"}
            </Heading>
        </SidebarHeader>
    )
}