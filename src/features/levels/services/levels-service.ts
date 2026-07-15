import { LevelsInput } from "../schemas/levels-schema";
import { Level, LevelWithLanguages, NewLevel } from "../types/levels.types";
import { ILevelsRepository, levelsRepository } from "./levels-repository";

class LevelsService {
    constructor(
        private levelsRepository: ILevelsRepository
    ) { }

    async getAllLevels(full: true): Promise<LevelWithLanguages[]>
    async getAllLevels(full?: false): Promise<Level[]>

    async getAllLevels(full: boolean = false): Promise<Level[] | LevelWithLanguages[]> {
        return await this.levelsRepository.getAll(full)
    }

    async getLevelById(id: string) {
        return await this.levelsRepository.getById(id)
    }

    async addLevel(data: LevelsInput) {

        const payload: NewLevel = {
            name: data.name
        }

        await this.levelsRepository.insert(payload)
    }
}

export const levelsService = new LevelsService(levelsRepository)