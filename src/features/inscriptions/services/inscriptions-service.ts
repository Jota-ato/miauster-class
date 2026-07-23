import {
  IUsersRepository,
  usersRepository,
} from "@/features/users/services/users-repository";
import { InscriptionInput } from "../schemas/inscription-schemas";
import { NewInscription } from "../types/inscriptions.types";
import {
  IInscriptionRepository,
  inscriptionRepository,
} from "./inscriptions-repository";
import { AppError } from "@/shared/lib/errors";
import {
  IStudentsRepository,
  studentsRepository,
} from "@/features/students/services/students-repository";
import {
  groupsRepository,
  IGroupsRepository,
} from "@/features/groups/services/groups-repository";
import { buildInscriptionSnapshot } from "../lib/build-inscription-snapshots";

class InscriptionService {
  constructor(
    private inscriptionRepository: IInscriptionRepository,
    private usersRepository: IUsersRepository,
    private studentsRepository: IStudentsRepository,
    private groupsRepository: IGroupsRepository,
  ) {}

  async createInscription(data: InscriptionInput, userId: string) {

    const { user, student, group } = await this.validateExistingData(data, userId);

    this.validateSpotsAvailability(group);

    const newInscription: NewInscription = {
      studentId: student.id,
      groupId: group.id,
      extraPrice: data.extraPrice.toString(),
      invoiceImage: data.invoiceImage,
      createdBy: user.id,
      ...buildInscriptionSnapshot(user, student, group, data.extraPrice),
    };

    await this.inscriptionRepository.insert(newInscription);
  }

  async validateExistingData(data: InscriptionInput, userId: string) {
    const [user, student, group] = await Promise.all([
      this.usersRepository.findById(userId),
      this.studentsRepository.getById(data.studentId),
      this.groupsRepository.getById(data.groupId),
    ]);

    if (!user) throw new AppError("Usuario no encontrado");
    if (!student) throw new AppError("Estudiante no encontrado");
    if (!group) throw new AppError("Grupo no encontrado");

    return { user, student, group };
  }

  validateSpotsAvailability(group: { leftSpots: number }) {
    if (group.leftSpots <= 0) throw new AppError("No hay cupos disponibles en este grupo");
  }
}

export const inscriptionService = new InscriptionService(
  inscriptionRepository,
  usersRepository,
  studentsRepository,
  groupsRepository,
);
