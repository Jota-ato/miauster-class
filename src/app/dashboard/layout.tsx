import { UsersPolicies } from "@/features/users/policies/user-policies"
import { User } from "@/features/users/types/user.types"
import { requireAuth } from "@/lib/auth-server"
import { DashboardSidebar } from "@/shared/components/dashboard/dashboard-sidebar"
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
        <div>
            <SidebarProvider>
                <DashboardSidebar
                    user={user as User}
                />
                <main>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}