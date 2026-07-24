import { inscriptions } from "@/db/schema";
import { Language } from "@/features/languages/types/languages.types";

export type Inscription = typeof inscriptions.$inferSelect;
export type NewInscription = typeof inscriptions.$inferInsert;
export type UpdateInscription = Partial<Omit<Inscription, "id" | "createdAt" | "updatedAt">>;
export type InscriptionWithLanguage = Inscription & {
    language: Language | null
}
