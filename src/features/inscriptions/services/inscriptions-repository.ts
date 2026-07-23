import { db } from "@/db";
import { Inscription, NewInscription } from "../types/inscriptions.types";
import { inscriptions } from "@/db/schema";

export interface IInscriptionRepository {
  insert(data: NewInscription): Promise<void>;
  findById(id: string): Promise<Inscription | null>;
  getByRangeAndUserId(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Inscription[]>;
}

class InscriptionRepository implements IInscriptionRepository {
  async insert(data: NewInscription): Promise<void> {
    await db.insert(inscriptions).values(data);
  }

  async findById(id: string): Promise<Inscription | null> {
    return (
      (await db.query.inscriptions.findFirst({
        where: (inscription, { eq }) => eq(inscription.id, id),
      })) || null
    );
  }

  async getByRangeAndUserId(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Inscription[]> {
    return await db.query.inscriptions.findMany({
      where: (inscription, { and, eq, gte, lte }) =>
        and(
          eq(inscription.createdBy, userId),
          gte(inscription.createdAt, startDate),
          lte(inscription.createdAt, endDate),
        ),
    });
  }
}

export const inscriptionRepository = new InscriptionRepository();
