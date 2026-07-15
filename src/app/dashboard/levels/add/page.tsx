import { requireAuth } from "@/lib/auth-server"
import { redirect } from "next/navigation"

export default async function AddLevelPage() {

    const { session, user } = await requireAuth()

    if (!session || !user) redirect("/auth/sign-in")

    if (user.role !== "admin") redirect("/not-authorized")

    return (
        <>

        </>
    )
}