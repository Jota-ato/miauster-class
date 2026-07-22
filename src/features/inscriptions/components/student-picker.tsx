"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Command, CommandDialog, CommandInput } from "@/shared/components/ui/command";
import { Student } from "@/features/students/types/students.types";
import { StudentCommandList } from "./student-command-list";
import { useStudentSearch } from "@/shared/hooks/use-students-seach";

interface StudentPickerProps {
  onSelect: (student: Student) => void;
  onCreate: (name: string) => void;
}

export function StudentPicker({ onSelect, onCreate }: StudentPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { students, isLoading } = useStudentSearch(search);

  const closeAndReset = () => {
    setOpen(false);
    setSearch("");
  };

  const handleSelect = (student: Student) => {
    onSelect(student);
    closeAndReset();
  };

  const handleCreate = () => {
    const trimmed = search.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    closeAndReset();
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} type="button">
        Buscar alumno
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Buscar alumno..."
            value={search}
            onValueChange={setSearch}
          />
          <StudentCommandList
            students={students}
            isLoading={isLoading}
            search={search}
            onSelect={handleSelect}
            onCreate={handleCreate}
          />
        </Command>
      </CommandDialog>
    </>
  );
}