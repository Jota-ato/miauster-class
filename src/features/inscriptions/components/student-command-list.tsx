import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Button } from "@/shared/components/ui/button";
import { Student } from "@/features/students/types/students.types";

interface StudentCommandListProps {
  students: Student[];
  isLoading: boolean;
  search: string;
  onSelect: (student: Student) => void;
  onCreate: () => void;
}

export function StudentCommandList({
  students,
  isLoading,
  search,
  onSelect,
  onCreate,
}: StudentCommandListProps) {
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
          <Button variant="outline" onClick={onCreate} className="mt-2" type="button">
            Crear nuevo alumno
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
            {student.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
}