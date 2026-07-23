"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import {
  inscriptionSchema,
  InscriptionInput,
} from "../schemas/inscription-schemas";
import { Student } from "@/features/students/types/students.types";
import { StudentPicker } from "./student-picker";
import { createStudentAction } from "@/features/students/actions/student-actions";
import { DetailedGroup } from "@/features/groups/types/groups.types";
import { CustomSelect } from "@/shared/components/forms/custom-select";
import { FieldInput } from "@/shared/components/forms/field-inputs.types";
import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { FormSubmit } from "@/shared/components/forms/form-submit";
import ImageUploader from "@/shared/components/upload/image-uploader";
import { showResponse } from "@/shared/lib/client-actions";
import {
  createInscriptionAction,
  updateInscriptionAction,
} from "../actions/inscriptions-actions";
import { Inscription } from "../types/inscriptions.types";

const inputs: FieldInput<InscriptionInput>[] = [
  {
    name: "extraPrice",
    label: "Precio extra",
    type: "number",
    step: "0.01",
    min: "0",
    placeholder: "Ingrese un precio extra si aplica",
  },
];

export function InscriptionForm({
  groups,
  userId,
  inscription,
}: {
  groups: DetailedGroup[];
  userId: string;
  inscription?: Inscription;
}) {
  const isEditting = !!inscription;

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InscriptionInput>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      studentName: isEditting ? inscription.studentNameSnapshot : "",
      studentId: isEditting ? inscription.studentId : "",
      extraPrice: isEditting ? +inscription.extraPrice : 0,
      invoiceImage: isEditting ? inscription.invoiceImage : "",
      groupId: isEditting ? inscription.groupId : "",
    },
  });

  const onSubmit = async (data: InscriptionInput) => {
    if (isEditting && inscription) {
      showResponse(await updateInscriptionAction(inscription.id, data, userId));
    } else {
      showResponse(await createInscriptionAction(data, userId));
    }
  };

  const handleSelectStudent = (student: Student) => {
    setValue("studentName", student.name);
    setValue("studentId", student.id);
  };

  const handleCreateStudent = async (name: string) => {
    const { data } = await createStudentAction(name);
    if (!data) return;
    setValue("studentName", data.name);
    setValue("studentId", data.id);
  };

  const image = watch("invoiceImage");

  const currentStudentName = watch("studentName");
  const submitLabel = isEditting ? "Actualizar inscripción" : "Crear inscripción";
  const isSubmittingLabel = isEditting ? "Actualizando..." : "Creando...";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <StudentPicker
              currentStudentName={currentStudentName}
              onSelect={handleSelectStudent}
              onCreate={handleCreateStudent}
              error={errors.studentId?.message}
            />
          </Field>
          <CustomSelect
            error={errors.groupId?.message}
            control={control}
            name="groupId"
            options={groups.map((group) => ({
              label: group.name,
              value: group.id,
            }))}
          />
          {inputs.map((input) => (
            <FieldWLabel
              key={input.name}
              register={register}
              error={errors[input.name]?.message}
              {...input}
            />
          ))}
          <ImageUploader
            image={image}
            label="Imagen del comprobante de pago"
            onChange={(url) =>
              setValue("invoiceImage", url ? url : "", { shouldValidate: true })
            }
          />
        </FieldGroup>
        <FormSubmit
          isSubmitting={isSubmitting}
          label={submitLabel}
          isSubmittingLabel={isSubmittingLabel}
        />
      </FieldSet>
    </form>
  );
}
