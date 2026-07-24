import { db } from "@/db";
import {
  Inscription,
  InscriptionWithLanguage,
  NewInscription,
  UpdateInscription,
} from "../types/inscriptions.types";
import { inscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface IInscriptionRepository {
  insert(data: NewInscription): Promise<void>;
  findById(id: string): Promise<InscriptionWithLanguage | null>;
  getByRangeAndUserId(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<InscriptionWithLanguage[]>;
  update(id: string, data: UpdateInscription): Promise<void>;
}

class InscriptionRepository implements IInscriptionRepository {
  async insert(data: NewInscription): Promise<void> {
    await db.insert(inscriptions).values(data);
  }

  async findById(id: string): Promise<InscriptionWithLanguage | null> {
    return (
      (await db.query.inscriptions.findFirst({
        with: {
          language: true,
        },
        where: (inscription, { eq }) => eq(inscription.id, id),
      })) || null
    );
  }

  async getByRangeAndUserId(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<InscriptionWithLanguage[]> {
    return await db.query.inscriptions.findMany({
      with: {
        language: true,
      },
      where: (inscription, { and, eq, gte, lte }) =>
        and(
          eq(inscription.createdBy, userId),
          gte(inscription.createdAt, startDate),
          lte(inscription.createdAt, endDate),
        ),
    });
  }

  async update(id: string, data: UpdateInscription): Promise<void> {
    await db.update(inscriptions).set(data).where(eq(inscriptions.id, id));
  }
}

export const inscriptionRepository = new InscriptionRepository();
