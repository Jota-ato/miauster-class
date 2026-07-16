import { User } from "@/features/users/types/user.types"
import { LevelWithLanguages } from "../types/levels.types"
import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell
} from "@/shared/components/ui/table"
import { UsersPolicies } from "@/features/users/policies/user-policies"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { Eye } from "lucide-react"
import { EyeButton } from "@/shared/components/ui/eye-button"
import { Route } from "next/dist/build/swc/types"

export function LevelsTable({
    levels,
    currentUser
}: {
    levels: LevelWithLanguages[]
    currentUser: User
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Idiomas</TableHead>
                    <TableHead>Acciones</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {levels.map((level) => (
                    <TableRow key={level.id}>
                        <TableCell>{level.name}</TableCell>
                        <TableCell>
                            {level.languagesLevels.length ? (
                                level.languagesLevels.map((langLevel, idx) => (
                                    <span key={langLevel.language.id}>
                                        {langLevel.language.name}
                                        {idx < level.languagesLevels.length - 1 && ", "}
                                    </span>
                                ))
                            ) : (
                                <span>No tiene idiomas asociados</span>
                            )}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                            <EyeButton 
                                href={`/dashboard/levels/${level.id}`}
                                aria-label="Ver nivel"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}