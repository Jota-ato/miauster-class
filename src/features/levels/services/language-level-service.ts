import { AppError } from "@/shared/lib/errors";
import { LanguageLevel, LanguageLevelWithLanguageAndLevel, NewLanguageLevel } from "../types/levels.types";
import {
  ILanguageLevelsRepository,
  languageLevelsRepository,
} from "./language-levels-repository";
import { ILevelsRepository, levelsRepository } from "./levels-repository";
import {
  ILanguagesRepository,
  languagesRepository,
} from "@/features/languages/services/languages-repository";

class LanguageLevelService {
  constructor(
    private languageLevelsRepository: ILanguageLevelsRepository,
    private levelsRepository: ILevelsRepository,
    private languageRepository: ILanguagesRepository,
  ) {}

  async getAllLanguageLevels(full: true) : Promise<LanguageLevelWithLanguageAndLevel[]>;
  async getAllLanguageLevels(full?: false) : Promise<LanguageLevel[]>; 
  async getAllLanguageLevels(full: boolean = true) {
    return await this.languageLevelsRepository.getAll(full);
  }

  private async validateLanguagesExist(languageIds: string[]): Promise<void> {
    const languagesResult = await Promise.all(
      languageIds.map(
        async (languageId) => await this.languageRepository.getById(languageId),
      ),
    );

    const languages = languagesResult.filter(
      (language): language is NonNullable<typeof language> => language !== null,
    );

    if (languages.length !== languageIds.length) {
      throw new AppError("Uno o más idiomas no encontrados");
    }
  }

  private async validateLevelsExist(levelIds: string[]): Promise<void> {
    const levelsResult = await Promise.all(
      levelIds.map(
        async (levelId) => await this.levelsRepository.getById(levelId),
      ),
    );

    const levels = levelsResult.filter(
      (level): level is NonNullable<typeof level> => level !== null,
    );

    if (levels.length !== levelIds.length) {
      throw new AppError("Uno o más niveles no encontrados");
    }
  }

  async getLevelsByLanguage(languageId: string) {
    await this.validateLanguagesExist([languageId]);

    return await this.languageLevelsRepository.getByLanguageId(languageId);
  }

  async addLanguagesToLevel(
    levelId: string,
    languageIds: string[],
  ): Promise<void> {
    const level = await this.levelsRepository.getById(levelId);

    if (!level) throw new AppError("Nivel no encontrado");

    await this.validateLanguagesExist(languageIds);

    const payload: NewLanguageLevel[] = languageIds.map((languageId) => ({
      levelId: level.id,
      languageId,
    }));

    await this.languageLevelsRepository.insert(payload);
  }

  async removeLanguagesFromLevel(levelId: string): Promise<void> {
    const level = await this.levelsRepository.getById(levelId);

    if (!level) throw new AppError("Nivel no encontrado");

    await this.languageLevelsRepository.deleteByLevelId(level.id);
  }

  async updateLanguagesInLevel(
    levelId: string,
    languageIds: string[],
  ): Promise<void> {
    const level = await this.levelsRepository.getById(levelId);

    if (!level) throw new AppError("Nivel no encontrado");

    await this.validateLanguagesExist(languageIds);

    const currentActive =
      await this.languageLevelsRepository.getActiveByLevelId(level.id);
    const currentActiveLanguageIds = new Set(
      currentActive.map((cl) => cl.languageId),
    );
    const newLanguageIds = new Set(languageIds);

    const toRemove = currentActive.filter(
      (cl) => !newLanguageIds.has(cl.languageId),
    );

    const toAdd = languageIds.filter((id) => !currentActiveLanguageIds.has(id));

    await Promise.all(
      toRemove.map((cl) => this.languageLevelsRepository.delete(cl.id)),
    );

    await Promise.all(
      toAdd.map(async (languageId) => {
        const existing =
          await this.languageLevelsRepository.getByLevelAndLanguage(
            level.id,
            languageId,
          );

        if (existing) {
          await this.languageLevelsRepository.reactivate(existing.id);
        } else {
          await this.languageLevelsRepository.insert([
            {
              levelId: level.id,
              languageId,
            },
          ]);
        }
      }),
    );
  }

  async updateLanguageInLevel(
    levelId: string,
    languageId: string,
    remove: boolean = false,
  ) {
    const level = await this.levelsRepository.getById(levelId);
    if (!level) throw new AppError("Nivel no encontrado");

    const language = await this.languageRepository.getById(languageId);
    if (!language) throw new AppError("Idioma no encontrado");

    const languageLevel =
      await this.languageLevelsRepository.getByLevelAndLanguage(
        level.id,
        language.id,
      );

    if (!languageLevel && remove)
      throw new AppError("El idioma no está asociado a este nivel");

    if (remove && languageLevel) {
      await this.languageLevelsRepository.delete(languageLevel.id);
    }

    if (!remove && !languageLevel) {
      await this.languageLevelsRepository.insert([
        {
          levelId: level.id,
          languageId: language.id,
        },
      ]);
    }

    if (!remove && languageLevel && !languageLevel.isActive) {
      await this.languageLevelsRepository.reactivate(languageLevel.id);
    }
  }

  async addLevelsToLanguage(
    languageId: string,
    levelIds: string[],
  ): Promise<void> {
    const language = await this.languageRepository.getById(languageId);

    if (!language) throw new AppError("Idioma no encontrado");

    await this.validateLevelsExist(levelIds);

    const payload: NewLanguageLevel[] = levelIds.map((levelId) => ({
      levelId,
      languageId: language.id,
    }));

    await this.languageLevelsRepository.insert(payload);
  }

  async removeLevelsFromLanguage(languageId: string): Promise<void> {
    const language = await this.languageRepository.getById(languageId);

    if (!language) throw new AppError("Idioma no encontrado");

    await this.languageLevelsRepository.deleteByLanguageId(language.id);
  }

  async updateLevelsInLanguage(
    languageId: string,
    levelIds: string[],
  ): Promise<void> {
    const language = await this.languageRepository.getById(languageId);

    if (!language) throw new AppError("Idioma no encontrado");

    await this.validateLevelsExist(levelIds);

    const currentActive =
      await this.languageLevelsRepository.getActiveByLanguageId(language.id);
    const currentActiveLevelIds = new Set(
      currentActive.map((cl) => cl.levelId),
    );
    const newLevelIds = new Set(levelIds);

    const toRemove = currentActive.filter(
      (cl) => !newLevelIds.has(cl.levelId),
    );

    const toAdd = levelIds.filter((id) => !currentActiveLevelIds.has(id));

    await Promise.all(
      toRemove.map((cl) => this.languageLevelsRepository.delete(cl.id)),
    );

    await Promise.all(
      toAdd.map(async (levelId) => {
        const existing =
          await this.languageLevelsRepository.getByLevelAndLanguage(
            levelId,
            language.id,
          );

        if (existing) {
          await this.languageLevelsRepository.reactivate(existing.id);
        } else {
          await this.languageLevelsRepository.insert([
            {
              levelId,
              languageId: language.id,
            },
          ]);
        }
      }),
    );
  }

  async updateLevelInLanguage(
    languageId: string,
    levelId: string,
    remove: boolean = false,
  ) {
    const language = await this.languageRepository.getById(languageId);
    if (!language) throw new AppError("Idioma no encontrado");

    const level = await this.levelsRepository.getById(levelId);
    if (!level) throw new AppError("Nivel no encontrado");

    const languageLevel =
      await this.languageLevelsRepository.getByLevelAndLanguage(
        level.id,
        language.id,
      );

    if (!languageLevel && remove)
      throw new AppError("El nivel no está asociado a este idioma");

    if (remove && languageLevel) {
      await this.languageLevelsRepository.delete(languageLevel.id);
    }

    if (!remove && !languageLevel) {
      await this.languageLevelsRepository.insert([
        {
          levelId: level.id,
          languageId: language.id,
        },
      ]);
    }

    if (!remove && languageLevel && !languageLevel.isActive) {
      await this.languageLevelsRepository.reactivate(languageLevel.id);
    }
  }
}

export const languageLevelService = new LanguageLevelService(
  languageLevelsRepository,
  levelsRepository,
  languagesRepository,
);