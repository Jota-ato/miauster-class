"use client"

import {
    useSidebar,
    SidebarHeader
} from "@/shared/components/ui/sidebar"
import { Heading } from "@/shared/components/typography/heading"
import Link from "next/link"

export function DashboardSidebarHeader() {
    const { open } = useSidebar()

    return (
        <SidebarHeader>
            <Link
                href="/dashboard"
            >
                <Heading className="text-lg! md:text-xl!">
                    {open ? "Miauster class" : "M"}
                </Heading>
            </Link>
        </SidebarHeader>
    )
}