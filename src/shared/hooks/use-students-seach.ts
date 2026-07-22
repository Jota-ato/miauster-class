import { useEffect, useRef, useState } from "react";
import { Student } from "@/features/students/types/students.types";
import { searchStudentsAction } from "@/features/students/actions/student-actions";
import { useDebouncedValue } from "./use-debounce-value";

interface UseStudentSearchResult {
  students: Student[];
  isLoading: boolean;
}

export function useStudentSearch(
  query: string,
  delayMs = 300,
): UseStudentSearchResult {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebouncedValue(query.trim(), delayMs);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!debouncedQuery) {
      setStudents([]);
      setIsLoading(false);
      return;
    }

    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);

    searchStudentsAction(debouncedQuery)
      .then(({ data }) => {
        if (currentRequestId !== requestIdRef.current) return;
        else setStudents(data ?? []);
      })
      .catch(() => {
        if (currentRequestId !== requestIdRef.current) return;
        setStudents([]);
      })
      .finally(() => {
        if (currentRequestId !== requestIdRef.current) return;
        setIsLoading(false);
      });
  }, [debouncedQuery]);

  return { students, isLoading };
}
