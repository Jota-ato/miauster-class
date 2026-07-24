import {
  IUsersRepository,
  usersRepository,
} from "@/features/users/services/users-repository";
import { InscriptionInput } from "../schemas/inscription-schemas";
import { InscriptionWithLanguage, NewInscription, UpdateInscription } from "../types/inscriptions.types";
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
import { UsersPolicies } from "@/features/users/policies/user-policies";

class InscriptionService {
  constructor(
    private inscriptionRepository: IInscriptionRepository,
    private usersRepository: IUsersRepository,
    private studentsRepository: IStudentsRepository,
    private groupsRepository: IGroupsRepository,
  ) {}

  async getById(id: string, userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError("Usuario no encontrado");
    const inscription = await this.inscriptionRepository.findById(id);
    if (inscription?.createdBy !== user.id && !UsersPolicies.isAdmin(user))
      throw new AppError("No autorizado para ver esta inscripción");
    return inscription;
  }

  async createInscription(data: InscriptionInput, userId: string) {
    const { user, student, group } = await this.validateExistingData(
      data,
      userId,
    );

    if (group) this.validateSpotsAvailability(group);

    const newInscription: NewInscription = {
      studentId: student.id,
      groupId: group?.id ?? null,
      levelTest: data.levelTest,
      invoiceImage: data.invoiceImage,
      languageId: "languageId" in data ? data.languageId : null,
      createdBy: user.id,
      observations: data.observations,
      ...buildInscriptionSnapshot(user, student, group, {
        testPrice: data.levelTest ? data.testPrice : undefined,
      }),
    };

    await this.inscriptionRepository.insert(newInscription);
  }

  async updateInscription(id: string, data: InscriptionInput, userId: string) {
    const existingInscription = await this.inscriptionRepository.findById(id);
    if (!existingInscription) throw new AppError("Inscripción no encontrada");

    const { user, student, group } = await this.validateExistingData(
      data,
      userId,
    );

    if (group) this.validateSpotsAvailability(group);

    const updatedInscription: UpdateInscription = {
      studentId: student.id,
      groupId: group?.id ?? null,
      levelTest: data.levelTest,
      invoiceImage: data.invoiceImage,
      languageId: "languageId" in data ? data.languageId : null,
      observations: data.observations,
      ...buildInscriptionSnapshot(user, student, group, {
        testPrice: data.levelTest ? data.testPrice : undefined,
      }),
    };

    if (
      (Object.keys(updatedInscription).includes("approved") ||
        Object.keys(updatedInscription).includes("comissionPaid")) &&
      !UsersPolicies.isAdmin(user)
    )
      throw new AppError(
        "No autorizado para actualizar los campos de aprobación o pago de comisión",
      );

    await this.inscriptionRepository.update(
      existingInscription.id,
      updatedInscription,
    );
  }

  async validateExistingData(data: InscriptionInput, userId: string) {
    const [user, student, group] = await Promise.all([
      this.usersRepository.findById(userId),
      this.studentsRepository.getById(data.studentId),
      data.levelTest
        ? Promise.resolve(null)
        : this.groupsRepository.getById(data.groupId),
    ]);

    if (!user) throw new AppError("Usuario no encontrado");
    if (!student) throw new AppError("Estudiante no encontrado");
    if (!data.levelTest && !group) throw new AppError("Grupo no encontrado");

    return { user, student, group };
  }

  async getInscriptionsByRangeAndUserId(
    userId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError("Usuario no encontrado");
    return await this.inscriptionRepository.getByRangeAndUserId(
      user.id,
      startDate,
      endDate,
    );
  }

  validateSpotsAvailability(group: { leftSpots: number }) {
    if (group.leftSpots <= 0)
      throw new AppError("No hay cupos disponibles en este grupo");
  }

  async getRangeStats(userId: string, startDate: Date, endDate: Date) {
    const inscriptions = await this.getInscriptionsByRangeAndUserId(
      userId,
      startDate,
      endDate,
    );
    const totalInscriptions = inscriptions.length;
    const approveInscriptions = inscriptions.filter(
      (inscription) => inscription.approved,
    ).length;
    const estimatedEarnings = inscriptions.reduce(
      (acc, inscription) => acc + +inscription.priceSnapshot,
      0,
    );
    return { totalInscriptions, approveInscriptions, estimatedEarnings };
  }
}

export const inscriptionService = new InscriptionService(
  inscriptionRepository,
  usersRepository,
  studentsRepository,
  groupsRepository,
);