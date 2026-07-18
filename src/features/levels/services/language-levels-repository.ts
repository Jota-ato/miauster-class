import { db } from "@/db";
import { languagesLevels } from "@/db/schema";
import {
  LanguageLevel,
  LanguageLevelWithLevel,
  NewLanguageLevel,
} from "../types/levels.types";
import { eq } from "drizzle-orm";

export interface ILanguageLevelsRepository {
  getByLevelAndLanguage(
    levelId: string,
    languageId: string,
  ): Promise<LanguageLevel | null>;
  getById(id: string): Promise<LanguageLevel | null>;
  getActiveByLevelId(levelId: string): Promise<LanguageLevel[]>;
  getActiveByLanguageId(languageId: string): Promise<LanguageLevel[]>;
  getByLanguageId(languageId: string): Promise<LanguageLevelWithLevel[]>;
  insert(languages: NewLanguageLevel[]): Promise<void>;
  delete(id: string): Promise<void>;
  deleteByLevelId(levelId: string): Promise<void>;
  deleteByLanguageId(languageId: string): Promise<void>;
  reactivate(id: string): Promise<void>;
}

class LanguageLevelsRepository implements ILanguageLevelsRepository {
  async getByLevelAndLanguage(
    levelId: string,
    languageId: string,
  ): Promise<LanguageLevel | null> {
    return (
      (await db.query.languagesLevels.findFirst({
        where: (languageLevel, { and, eq }) =>
          and(
            eq(languageLevel.levelId, levelId),
            eq(languageLevel.languageId, languageId),
          ),
      })) || null
    );
  }

  async getById(id: string): Promise<LanguageLevel | null> {
    return (
      (await db.query.languagesLevels.findFirst({
        where: (languageLevel, { eq }) => eq(languageLevel.id, id),
      })) || null
    );
  }

  async getByLanguageId(languageId: string): Promise<LanguageLevelWithLevel[]> {
    return await db.query.languagesLevels.findMany({
      where: (languageLevel, { eq }) =>
        eq(languageLevel.languageId, languageId),
      with: {
        level: true,
      },
    });
  }

  async getActiveByLevelId(levelId: string): Promise<LanguageLevel[]> {
    return await db.query.languagesLevels.findMany({
      where: (languageLevel, { and, eq }) =>
        and(
          eq(languageLevel.levelId, levelId),
          eq(languageLevel.isActive, true),
        ),
    });
  }

  async getActiveByLanguageId(languageId: string): Promise<LanguageLevel[]> {
    return await db.query.languagesLevels.findMany({
      where: (languageLevel, { and, eq }) =>
        and(
          eq(languageLevel.languageId, languageId),
          eq(languageLevel.isActive, true),
        ),
    });
  }

  async insert(languages: NewLanguageLevel[]): Promise<void> {
    await db.insert(languagesLevels).values(languages);
  }

  async delete(id: string): Promise<void> {
    await db
      .update(languagesLevels)
      .set({
        isActive: false,
      })
      .where(eq(languagesLevels.id, id));
  }

  async deleteByLevelId(levelId: string): Promise<void> {
    await db
      .update(languagesLevels)
      .set({
        isActive: false,
      })
      .where(eq(languagesLevels.levelId, levelId));
  }

  async deleteByLanguageId(languageId: string): Promise<void> {
    await db
      .update(languagesLevels)
      .set({
        isActive: false,
      })
      .where(eq(languagesLevels.languageId, languageId));
  }

  async reactivate(id: string): Promise<void> {
    await db
      .update(languagesLevels)
      .set({
        isActive: true,
      })
      .where(eq(languagesLevels.id, id));
  }
}

export const languageLevelsRepository = new LanguageLevelsRepository();