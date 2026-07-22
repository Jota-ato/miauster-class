import { db } from "@/db";
import { NewStudent, Student } from "../types/students.types";
import { students } from "@/db/schema";

export interface IStudentsRepository {
  search(query: string): Promise<Student[]>;
  insert(data: NewStudent): Promise<Student>;
}

class StudentsRepository implements IStudentsRepository {
  async search(query: string): Promise<Student[]> {
    return await db.query.students.findMany({
      where: (students, { ilike }) => ilike(students.name, `%${query}%`),
      limit: 10,
      orderBy: (students, { sql }) =>
        sql`similarity(${students.name}, ${query}) DESC`,
    });
  }

  async insert(data: NewStudent): Promise<Student> {
    return (await db.insert(students).values(data).returning())[0];
  }
}

export const studentsRepository = new StudentsRepository();
