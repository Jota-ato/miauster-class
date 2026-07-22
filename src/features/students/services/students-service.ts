import { Student } from "../types/students.types";
import { IStudentsRepository, studentsRepository } from "./students-repository";

class StudentsService {
  constructor(private studentsRepository: IStudentsRepository) {}

  async searchStudents(query: string): Promise<Student[]> {
    const trimmed = query.trim();
    return await this.studentsRepository.search(trimmed);
  }

  async createStudent(name: string): Promise<Student> {
    const payload = {
      name: name.trim(),
      isActive: true,
    };

    return await this.studentsRepository.insert(payload);
  }

  async listRecent(limit: number = 20): Promise<Student[]> {
    return await studentsRepository.listRecent(limit);
  }
}

export const studentsService = new StudentsService(studentsRepository);
