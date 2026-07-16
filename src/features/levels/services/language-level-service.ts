import { AppError } from "@/shared/lib/errors";
import { NewLanguageLevel } from "../types/levels.types";
import { ILanguageLevelsRepository, languageLevelsRepository } from "./language-levels-repository";
import { ILevelsRepository, levelsRepository } from "./levels-repository";
import { ILanguagesRepository, languagesRepository } from "@/features/languages/services/languages-repository";

class LanguageLevelService {
    constructor(
        private languageLevelsRepository: ILanguageLevelsRepository,
        private levelsRepository: ILevelsRepository,
        private languageRepository: ILanguagesRepository
    ) { }

    async addLanguagesToLevel(levelId: string, languageIds: string[]): Promise<void> {

        const level = await this.levelsRepository.getById(levelId)

        if (!level) throw new AppError("Nivel no encontrado")

        const languagesResult = await Promise.all(
            languageIds.map(async (languageId) => await this.languageRepository.getById(languageId))
        )

        const languages = languagesResult.filter(
            (language): language is NonNullable<typeof language> => language !== null
        )

        if (languages.length !== languageIds.length) {
            throw new AppError("Uno o más idiomas no encontrados")
        }

        const payload: NewLanguageLevel[] = languages.map(language => ({
            levelId: level.id,
            languageId: language.id
        }))

        await this.languageLevelsRepository.insert(payload)
    }

    async removeLanguagesFromLevel(levelId: string): Promise<void> {
        const level = await this.levelsRepository.getById(levelId)

        if (!level) throw new AppError("Nivel no encontrado")

        await this.languageLevelsRepository.deleteByLevelId(level.id)
    }

    async updateLanguagesInLevel(levelId: string, languageIds: string[]): Promise<void> {
        const level = await this.levelsRepository.getById(levelId)

        if (!level) throw new AppError("Nivel no encontrado")
        
        await this.removeLanguagesFromLevel(level.id)
        await this.addLanguagesToLevel(level.id, languageIds)
    }
}

export const languageLevelService = new LanguageLevelService(
    languageLevelsRepository,
    levelsRepository,
    languagesRepository
)