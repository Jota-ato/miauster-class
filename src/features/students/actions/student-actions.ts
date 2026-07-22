"use server"

import { sellerAction } from "@/shared/lib/actions"
import { studentsService } from "../services/students-service";

export const searchStudentsAction = sellerAction(async (query: string) => {
  const data = await studentsService.searchStudents(query);
  return data
})

export const createStudentAction = sellerAction(async (name: string) => {
  const data = await studentsService.createStudent(name);
  return data
})