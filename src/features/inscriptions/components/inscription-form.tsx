"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { inscriptionSchema, InscriptionInput } from "../schemas/inscription-schemas";
import { Student } from "@/features/students/types/students.types";
import { StudentPicker } from "./student-picker";
import { createStudentAction } from "@/features/students/actions/student-actions";
import { DetailedGroup } from "@/features/groups/types/groups.types";
import { CustomSelect } from "@/shared/components/forms/custom-select";

export function InscriptionForm({
    groups
}: {
    groups: DetailedGroup[]
}) {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InscriptionInput>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      studentName: "",
      extraPrice: 0,
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
          <CustomSelect 
            control={control}
            name="groupId"
            options={groups.map(group => ({
                label: group.name,
                value: group.id
            }))}
          />
        </FieldGroup>
      </FieldSet>
    </form>
  );
}