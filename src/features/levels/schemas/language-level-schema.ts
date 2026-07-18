import { z } from "zod";

export const languageLevelSchema = z.object({
  languages: z.array(z.uuid()),
});

export type LanguageLevelInput = z.infer<typeof languageLevelSchema>;
