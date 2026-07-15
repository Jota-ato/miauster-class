import { LevelWithLanguages } from "../types/levels.types"
import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell
} from "@/shared/components/ui/table"

export function LevelsTable({
    levels
}: {
    levels: LevelWithLanguages[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Idiomas</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {levels.map((level) => (
                    <TableRow key={level.id}>
                        <TableCell>{level.name}</TableCell>
                        <TableCell>
                            {level.languagesLevels.length ? (
                                level.languagesLevels.map((langLevel) => (
                                    <span key={langLevel.language.id}>
                                        {langLevel.language.name}
                                    </span>
                                ))
                            ) : (
                                <span>No tiene idiomas asociados</span>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}