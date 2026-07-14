"use client"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from "@/shared/components/ui/select"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {

    const { resolvedTheme: theme, setTheme } = useTheme()

    const handleThemeChange = (value: string | null) => {
        if (!value) return
        const newTheme = value === "claro" ? "light" : "dark"
        setTheme(newTheme)
    }

    return (
        <Select onValueChange={handleThemeChange}>
            <SelectTrigger>
                <SelectValue placeholder="Selecciona un tema" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="claro">
                        claro <Sun className="size-4" />
                    </SelectItem>
                    <SelectItem value="oscuro">
                        oscuro <Moon className="size-4" />
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}