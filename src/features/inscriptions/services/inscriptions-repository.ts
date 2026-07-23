import { db } from "@/db";
import { NewInscription } from "../types/inscriptions.types";
import { inscriptions } from "@/db/schema";

export interface IInscriptionRepository {
  insert(data: NewInscription): Promise<void>;
}

class InscriptionRepository implements IInscriptionRepository {
  async insert(data: NewInscription): Promise<void> {
    await db.insert(inscriptions).values(data);
  }
}

export const inscriptionRepository = new InscriptionRepository();
