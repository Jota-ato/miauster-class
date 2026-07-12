import { ReactNode } from "react"

export default function AuthLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <section>
            <main>
                {children}
            </main>
        </section>
    )
}