"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { inscriptionSchema, InscriptionInput } from "../schemas/inscription-schemas";
import { Student } from "@/features/students/types/students.types";
import { StudentPicker } from "./student-picker";
import { studentsService } from "@/features/students/services/students-service";
import { createStudentAction } from "@/features/students/actions/student-actions";

export function InscriptionForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InscriptionInput>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      studentName: "",
    },
  });

  const onSubmit = (data: InscriptionInput) => {
    console.log("Datos del formulario:", data);
  };

  const handleSelectStudent = (student: Student) => {
    setValue("studentName", student.name);
    setValue("studentId", student.id);
  };

  const handleCreateStudent = async (name: string) => {
    const { data } = await createStudentAction(name);
    if (!data) return
    setValue("studentName", data.name);
    setValue("studentId", data.id);
  };

  const currentStudentName = watch("studentName");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <StudentPicker currentStudentName={currentStudentName} onSelect={handleSelectStudent} onCreate={handleCreateStudent} />
            {errors.studentName && <FieldError>{errors.studentName.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}