import { UsersPolicies } from "@/features/users/policies/user-policies"
import { User } from "@/features/users/types/user.types"
import { requireAuth } from "@/lib/auth-server"
import { redirect } from "next/dist/client/components/navigation"

export default async function DashboardHomePage() {

    const { session } = await requireAuth()

    if (!session) redirect("/not-authorized")

    if (!UsersPolicies.isAuthorizedToDashboard(session.user as User)) redirect("/not-authorized")

    return (
        <section>
        </section>
    )
}