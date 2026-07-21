import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { DetailedGroup } from "../types/groups.types";
import { EyeButton } from "@/shared/components/ui/eye-button";
import { formatTime } from "@/shared/utils/schedule-formater";

export function GroupsTable({ groups }: { groups: DetailedGroup[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Idioma</TableHead>
          <TableHead>Nivel</TableHead>
          <TableHead>Horario</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell>{group.name}</TableCell>
            <TableCell>{group.languageLevel.language.name}</TableCell>
            <TableCell>{group.languageLevel.level.name}</TableCell>
            <TableCell>
              {!group.regularSchedule ? (
                "Irregular"
              ) : (
                <>
                  <p>Lun-Jue</p>
                  <span>
                    {formatTime(group.schedules[0].startTime)} -{" "}
                    {formatTime(group.schedules[0].endTime)}
                  </span>
                </>
              )}
            </TableCell>
            <TableCell>
              <EyeButton href={`/dashboard/groups/${group.id}`} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
