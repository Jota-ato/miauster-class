import { AppError } from "@/shared/lib/errors";
import { LevelsInput } from "../schemas/levels-schema";
import { Level, LevelWithLanguages, NewLevel, UpdateLevel } from "../types/levels.types";
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
            name: data.name,
            description: data.description,
            isActive: data.isActive || false
        }

        await this.levelsRepository.insert(payload)
    }

    async updateLevel(id: string, data: LevelsInput) {

        const level = await this.levelsRepository.getById(id)

        if (!level) {
            throw new AppError("Level not found")
        }

        const payload: UpdateLevel = {
            name: data.name,
            description: data.description,
            isActive: data.isActive ? true : false
        }

        await this.levelsRepository.update(id, payload)
    }
}

export const levelsService = new LevelsService(levelsRepository)