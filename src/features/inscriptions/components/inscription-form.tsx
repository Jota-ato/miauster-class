"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldSet } from "@/shared/components/ui/field";
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
  };

  const handleCreateStudent = async (name: string) => {
    const { data } = await createStudentAction(name);
    if (!data) return
    setValue("studentName", data.name);
    setValue("studentId", data.id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <StudentPicker onSelect={handleSelectStudent} onCreate={handleCreateStudent} />
            <input type="hidden" {...register("studentName")} />
            {errors.studentName && <span>{errors.studentName.message}</span>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}