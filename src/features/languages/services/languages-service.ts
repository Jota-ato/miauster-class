import { NewLanguage } from "../types/languages.types";
import { ILanguagesRepository, languagesRepository } from "./languages-repository";

class LanguagesService {
    constructor(
        private readonly languagesRepository: ILanguagesRepository
    ) { }

    async getAllLanguages() {
        return await this.languagesRepository.getAll()
    }

    async getLanguageById(id: string) {
        return await this.languagesRepository.getById(id)
    }

    async createLanguage(data: NewLanguage) {
        return await this.languagesRepository.insert(data)
    }
}

export const languagesService = new LanguagesService(
    languagesRepository
)