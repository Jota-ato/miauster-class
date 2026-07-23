import { Student } from "@/features/students/types/students.types";
import { Group } from "@/features/groups/types/groups.types";
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

export function buildInscriptionSnapshot(
  user: User,
  student: Student,
  group: Group,
): InscriptionSnapshot {
  return {
    priceSnapshot: group.weeklyPrice,
    creatorNameSnapshot: user.name,
    studentNameSnapshot: student.name,
    groupNameSnapshot: group.name,
    groupStartDateSnapshot: group.startDate,
  };
}
