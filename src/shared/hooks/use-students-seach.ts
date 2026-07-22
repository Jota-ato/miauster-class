import { useEffect, useRef, useState } from "react";
import { Student } from "@/features/students/types/students.types";
import { listRecentStudentsAction, searchStudentsAction } from "@/features/students/actions/student-actions";
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
  const [isLoading, setIsLoading] = useState(true);
  const debouncedQuery = useDebouncedValue(query.trim(), delayMs);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);

    const request = debouncedQuery
      ? searchStudentsAction(debouncedQuery)
      : listRecentStudentsAction(20);

    request
      .then(({ data }) => {
        if (currentRequestId !== requestIdRef.current) return;
        setStudents(data ?? []);
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