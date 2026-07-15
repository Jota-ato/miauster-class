import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { redirect } from "next/navigation";

export default async function AddLanguagePage() {

    const { session, user } = await requireAuth()

    if (!session || !user) redirect("/auth/sign-in")

    return (
        <>
            <Heading>
                Agregar idioma
            </Heading>
        </>
    )
}