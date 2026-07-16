import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { Eye } from "lucide-react";
import { Route } from "next";
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import type { VariantProps } from "class-variance-authority"


export function EyeButton({
    href,
    className,
    variant = "outline",
    size = "icon",
    ...props
}: {
    href: string
} & ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            render={<Link href={href as Route} />}
            nativeButton={false}
            {...props}
        >
            <Eye />
        </Button>
    )
}