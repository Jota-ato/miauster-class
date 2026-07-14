import { ComponentProps } from "react"
import { Path } from "react-hook-form"
import { Input } from "@/shared/components/ui/input"

export type FieldInput<T> = {
    label: string
    name: Path<T>
} & Omit<ComponentProps<typeof Input>, "name">