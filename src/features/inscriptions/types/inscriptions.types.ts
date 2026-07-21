import { inscriptions } from "@/db/schema";

export type Inscription = typeof inscriptions.$inferSelect;
export type NewInscription = typeof inscriptions.$inferInsert;
export type UpdateInscription = Partial<Omit<Inscription, "id" | "createdAt" | "updatedAt">>;

