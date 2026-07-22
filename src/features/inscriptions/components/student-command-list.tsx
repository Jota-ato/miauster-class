import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Button } from "@/shared/components/ui/button";
import { Student } from "@/features/students/types/students.types";
import { GraduationCap, Plus } from "lucide-react";

export function StudentCommandList({
  students,
  isLoading,
  search,
  onSelect,
  onCreate,
}: {
  students: Student[];
  isLoading: boolean;
  search: string;
  onSelect: (student: Student) => void;
  onCreate: () => void;
}) {
  if (isLoading) {
    return (
      <CommandList>
        <CommandEmpty>Buscando...</CommandEmpty>
      </CommandList>
    );
  }

  if (students.length === 0) {
    return (
      <CommandList>
        <CommandEmpty>
          No se encontró &quot;{search}&quot;
          <br />
          <Button
            variant="outline"
            onClick={onCreate}
            className="mt-2"
            type="button"
          >
            <Plus /> Crear nuevo alumno
          </Button>
        </CommandEmpty>
      </CommandList>
    );
  }

  return (
    <CommandList>
      <CommandGroup>
        {students.map((student) => (
          <CommandItem key={student.id} onSelect={() => onSelect(student)}>
            <GraduationCap /> {student.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
}
