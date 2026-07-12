import { Container } from "@/shared/components/layout/container"
import { Heading } from "@/shared/components/typography/heading"
import { ReactNode } from "react"

export default function AuthLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <section className="py-8 md:py-12">
            <main>
                {children}
            </main>
        </section>
    )
}