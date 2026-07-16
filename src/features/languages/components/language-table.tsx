import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell
} from "@/shared/components/ui/table"
import { LanguageWithLanguagesLevels } from "../types/languages.types"
import { EyeButton } from "@/shared/components/ui/eye-button"

export function LanguagesTable({
    languages
}: {
    languages: LanguageWithLanguagesLevels[]
}) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Niveles</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {languages.map((language) => (
                    <TableRow key={language.id}>
                        <TableCell>{language.name}</TableCell>
                        <TableCell>
                            {language.languagesLevels.length ? (
                                language.languagesLevels.map((langLevel, idx) => (
                                    <span key={langLevel.id}>
                                        {langLevel.level.name}
                                        {idx < language.languagesLevels.length - 1 && ", "}
                                    </span>
                                ))
                            ) : (
                                <span>No tiene niveles asociados</span>
                            )}
                        </TableCell>
                        <TableCell>
                            <EyeButton 
                                href={`/dashboard/languages/${language.id}`}
                                aria-label="Ver idioma"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}