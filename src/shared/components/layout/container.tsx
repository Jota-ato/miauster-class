import { cn } from "@/shared/lib/utils"
import { ReactNode } from "react"

export function Container({
    children,
    className
}: {
    children: ReactNode,
    className?: string
}) {
  return (
    <div className={cn(
        "max-w-5xl w-[90%] mx-auto",
        className
    )}>
      {children}
    </div>
  )
}