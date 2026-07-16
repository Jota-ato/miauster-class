import { Language, LanguageWithLanguagesLevels, NewLanguage } from "../types/languages.types";
import { ILanguagesRepository, languagesRepository } from "./languages-repository";

class LanguagesService {
    constructor(
        private readonly languagesRepository: ILanguagesRepository
    ) { }

    async getAllLanguages(full: true) : Promise<LanguageWithLanguagesLevels[]>
    async getAllLanguages(full?: false) : Promise<Language[]>
    async getAllLanguages(full?: boolean) {
        return await this.languagesRepository.getAll(full)
    }

    async getLanguageById(id: string) {
        return await this.languagesRepository.getById(id)
    }

    async getLanguagesByLevel(levelId: string) {
        return await this.languagesRepository.getByLevel(levelId)
    }

    async createLanguage(data: NewLanguage) {
        return await this.languagesRepository.insert(data)
    }
}

export const languagesService = new LanguagesService(
    languagesRepository
)