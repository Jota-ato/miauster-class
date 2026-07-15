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
                            <Button
                                variant="outline"
                                size="icon"
                                render={<Link href={`/dashboard/levels/${level.id}`} />}
                                nativeButton={false}
                                aria-label="Ver detalles"
                            >
                                <Eye />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}