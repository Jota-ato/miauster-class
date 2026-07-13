"use client"

import { useSidebar } from "@/shared/components/ui/sidebar"
import { Heading } from "@/shared/components/typography/heading"

export function DashboardSidebarHeader() {
    const { open } = useSidebar()

    return (
        <Heading className="text-lg! md:text-xl!">
            {open ? "Miauster class" : "M"}
        </Heading>
    )
}