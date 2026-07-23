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
  extraPrice: number,
): InscriptionSnapshot {
  return {
    priceSnapshot: (Number(group.weeklyPrice) + extraPrice).toString(),
    creatorNameSnapshot: user.name,
    studentNameSnapshot: student.name,
    groupNameSnapshot: group.name,
    groupStartDateSnapshot: group.startDate,
  };
}
