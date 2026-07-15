import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell
} from "@/shared/components/ui/table"
import { LanguageWithLanguagesLevels } from "../types/languages.types"

export function LanguagesTable({
    languages
}: {
    languages: LanguageWithLanguagesLevels[]
}) {

    console.log(languages)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Niveles</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {languages.map((language) => (
                    <TableRow key={language.id}>
                        <TableCell>{language.name}</TableCell>
                        <TableCell>
                            {language.languagesLevels.length ? (
                                language.languagesLevels.map(langLevel => (
                                    <span key={langLevel.id}>{langLevel.level.name}</span>
                                ))
                            ): (
                                <span>No tiene niveles asociados</span>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}