import { Student } from "@/features/students/types/students.types";
import { DetailedGroup } from "@/features/groups/types/groups.types";
import { NewInscription } from "../types/inscriptions.types";
import { User } from "@/features/users/types/user.types";

type InscriptionSnapshot = Pick<
  NewInscription,
  | "priceSnapshot"
  | "creatorNameSnapshot"
  | "studentNameSnapshot"
  | "groupNameSnapshot"
  | "groupStartDateSnapshot"
>;

type LevelTestPriceOptions = {
  testPrice?: number;
};

export function buildInscriptionSnapshot(
  user: User,
  student: Student,
  group: DetailedGroup | null,
  { testPrice }: LevelTestPriceOptions = {},
): InscriptionSnapshot {
  if (!group) {
    if (testPrice === undefined) {
      throw new Error(
        "testPrice es requerido cuando la inscripción no tiene grupo (examen de colocación)",
      );
    }

    return {
      priceSnapshot: testPrice.toString(),
      creatorNameSnapshot: user.name,
      studentNameSnapshot: student.name,
      groupNameSnapshot: null,
      groupStartDateSnapshot: null,
    };
  }

  return {
    priceSnapshot: group.weeklyPrice,
    creatorNameSnapshot: user.name,
    studentNameSnapshot: student.name,
    groupNameSnapshot: group.name,
    groupStartDateSnapshot: group.startDate,
  };
}
