"use client";
import { useState } from "react";
import { Check, ChevronsUpDown, UserRound } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandInput,
} from "@/shared/components/ui/command";
import { Student } from "@/features/students/types/students.types";
import { StudentCommandList } from "./student-command-list";
import { useStudentSearch } from "@/shared/hooks/use-students-seach";
import { cn } from "@/shared/lib/utils";

export function StudentPicker({
  onSelect,
  onCreate,
  currentStudentName,
}: {
  onSelect: (student: Student) => void;
  onCreate: (name: string) => void;
  currentStudentName?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { students, isLoading } = useStudentSearch(search);

  const hasSelection = Boolean(currentStudentName);

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
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        type="button"
        className={cn(
          "w-full justify-between font-normal",
          hasSelection && "border-primary/50 bg-primary/5"
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {hasSelection ? (
            <Check className="size-4 shrink-0 text-primary" />
          ) : (
            <UserRound className="size-4 shrink-0 text-muted-foreground" />
          )}
          <span className={cn("truncate", !hasSelection && "text-muted-foreground")}>
            {currentStudentName ?? "Seleccionar alumno"}
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
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