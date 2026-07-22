"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import {
  inscriptionSchema,
  InscriptionInput,
} from "../schemas/inscription-schemas";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { students as initialStudents } from "./students"; // lista mockeada
import { Student } from "@/features/students/types/students.types";

export function InscriptionForm() {
  // Estado local de alumnos (para poder agregar nuevos)
  const [students, setStudents] = useState(initialStudents);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InscriptionInput>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      studentName: "", // asumo que existe este campo en el esquema
    },
  });

  const onSubmit = (data: InscriptionInput) => {
    console.log("Datos del formulario:", data);
    // Aquí envías los datos
  };

  // Filtrado de alumnos según búsqueda
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Manejar selección de un alumno existente
  const handleSelectStudent = (studentName: string) => {
    setValue("studentName", studentName);
    setOpen(false);
    setSearch(""); // limpiar búsqueda al cerrar
  };

  // Manejar creación de un nuevo alumno
  const handleCreateStudent = () => {
    if (search.trim() === "") return;
    // Crear nuevo alumno (aquí podrías llamar a una API)
    const newStudent: Student = {
      id: Date.now().toString(), // o generar un ID único
      name: search.trim(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudents((prev) => [...prev, newStudent]);
    setValue("studentName", newStudent.name);
    setOpen(false);
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              type="button"
            >
              Buscar alumno
            </Button>

            {/* Campo oculto o visible para el nombre del alumno (puedes mostrar el valor seleccionado) */}
            <input type="hidden" {...register("studentName")} />
            {errors.studentName && <span>{errors.studentName.message}</span>}

            <CommandDialog open={open} onOpenChange={setOpen}>
              <Command>
                <CommandInput
                  placeholder="Buscar alumno..."
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandList>
                  {filteredStudents.length === 0 ? (
                    <CommandEmpty>
                      No se encontró "{search}"
                      <br />
                      <Button
                        variant="outline"
                        onClick={handleCreateStudent}
                        className="mt-2"
                        type="button"
                      >
                        Crear nuevo alumno
                      </Button>
                    </CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {filteredStudents.map((student) => (
                        <CommandItem
                          key={student.id}
                          onSelect={() => handleSelectStudent(student.name)}
                        >
                          {student.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </CommandDialog>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
