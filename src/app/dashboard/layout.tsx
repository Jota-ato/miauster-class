import { DashboardSidebar } from "@/shared/components/dashboard/dashboard-sidebar"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div>
            <SidebarProvider>
                <DashboardSidebar />
                <main>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}