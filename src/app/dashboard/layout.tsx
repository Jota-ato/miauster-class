import { UsersPolicies } from "@/features/users/policies/user-policies"
import { User } from "@/features/users/types/user.types"
import { requireAuth } from "@/lib/auth-server"
import { DashboardSidebar } from "@/shared/components/dashboard/dashboard-sidebar"
import { MobileHeader } from "@/shared/components/dashboard/mobile-header"
import { Container } from "@/shared/components/layout/container"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function DashboardLayout({
    children
}: {
    children: ReactNode
}) {

    const { session } = await requireAuth()

    if (!session) redirect("/not-authorized")

    const { user } = session

    if (!UsersPolicies.isAuthorizedToDashboard(user as User)) redirect("/not-authorized")

    return (
        <SidebarProvider>
            <DashboardSidebar
                user={user as User}
            />
            <main className="flex-1">
                <Container>
                    <MobileHeader />
                    {children}
                </Container>
            </main>
        </SidebarProvider>
    )
}