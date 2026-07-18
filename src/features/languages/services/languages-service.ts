import { AppError } from "@/shared/lib/errors";
import {
  Language,
  LanguageWithLanguagesLevels,
  NewLanguage,
} from "../types/languages.types";
import {
  ILanguagesRepository,
  languagesRepository,
} from "./languages-repository";

class LanguagesService {
  constructor(private readonly languagesRepository: ILanguagesRepository) {}

  async getAllLanguages(full: true): Promise<LanguageWithLanguagesLevels[]>;
  async getAllLanguages(full?: false): Promise<Language[]>;
  async getAllLanguages(full?: boolean) {
    return await this.languagesRepository.getAll(full);
  }

  async getLanguageById(id: string) {
    return await this.languagesRepository.getById(id);
  }

  async getLanguagesByLevel(levelId: string) {
    return await this.languagesRepository.getByLevel(levelId);
  }

  async createLanguage(data: NewLanguage) {
    return await this.languagesRepository.insert(data);
  }

  async updateLanguage(data: NewLanguage, id: string) {
    const language = await this.languagesRepository.getById(id);

    if (!language) throw new AppError("Idioma no encontrado");

    await this.languagesRepository.update(data, id);
  }
}

export const languagesService = new LanguagesService(languagesRepository);
