"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Student } from "@/features/students/types/students.types";
import { StudentPicker } from "./student-picker";
import { createStudentAction } from "@/features/students/actions/student-actions";
import { DetailedGroup } from "@/features/groups/types/groups.types";
import { CustomSelect } from "@/shared/components/forms/custom-select";
import { FormSubmit } from "@/shared/components/forms/form-submit";
import ImageUploader from "@/shared/components/upload/image-uploader";
import { showResponse } from "@/shared/lib/client-actions";
import {
  createInscriptionAction,
  updateInscriptionAction,
} from "../actions/inscriptions-actions";
import {
  Inscription,
  InscriptionWithLanguage,
} from "../types/inscriptions.types";
import { CustomSwitch } from "@/shared/components/forms/custom-switch";
import {
  InscriptionInput,
  inscriptionSchema,
} from "../schemas/inscription-schemas";
import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { Language } from "@/features/languages/types/languages.types";
import { Textarea } from "@/shared/components/ui/textarea";

export function InscriptionForm({
  groups,
  userId,
  inscription,
  languages,
}: {
  groups: DetailedGroup[];
  userId: string;
  inscription?: InscriptionWithLanguage;
  languages: Language[];
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
      invoiceImage: isEditting ? inscription.invoiceImage : "",
      observations: isEditting ? (inscription.observations ?? "") : "",
      levelTest: isEditting ? inscription.levelTest : false,
      ...(isEditting && inscription.levelTest
        ? {
            languageId: inscription.language?.id,
            testPrice: Number(inscription.priceSnapshot),
          }
        : {
            groupId: isEditting ? (inscription.groupId ?? "") : "",
          }),
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
  const levelTest = watch("levelTest");

  const currentStudentName = watch("studentName");
  const submitLabel = isEditting
    ? "Actualizar inscripción"
    : "Crear inscripción";
  const isSubmittingLabel = isEditting ? "Actualizando..." : "Creando...";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <div className="flex gap-2 flex-col md:flex-row">
            <Field>
              <StudentPicker
                currentStudentName={currentStudentName}
                onSelect={handleSelectStudent}
                onCreate={handleCreateStudent}
                error={errors.studentId?.message}
              />
            </Field>
            <CustomSwitch
              control={control}
              label="Examen de colocación"
              name="levelTest"
              description="Si realizó examen de colocación no es necesario asignar el grupo"
            />
          </div>
          {levelTest ? (
            <>
              <CustomSelect
                control={control}
                name="languageId"
                label="Idioma"
                placeholder="Idioma"
                options={languages.map((language) => ({
                  label: language.name,
                  value: language.id,
                }))}
              />
              <FieldWLabel
                register={register}
                label="Precio del examen de colocación"
                error={
                  "testPrice" in errors ? errors.testPrice?.message : undefined
                }
                type="number"
                {...register("testPrice")}
              />
            </>
          ) : (
            <CustomSelect
              label="Grupo"
              placeholder="Grupo"
              error={"groupId" in errors ? errors.groupId?.message : undefined}
              control={control}
              name="groupId"
              options={groups.map((group) => ({
                label: group.name,
                value: group.id,
              }))}
            />
          )}
          <Field>
            <FieldLabel>Observaciones</FieldLabel>
            <Textarea {...register("observations")} />
          </Field>
          <ImageUploader
            error={errors.invoiceImage?.message}
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
