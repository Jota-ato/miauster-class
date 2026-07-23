import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Inscription } from "../types/inscriptions.types";
import { InscriptionsTable } from "./inscriptions-table";

export function RecentInscriptionsCard({
  inscriptions,
}: {
  inscriptions: Inscription[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscripciones Recientes</CardTitle>
        <CardDescription>
          Historial de alumnos inscritos esta semana.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InscriptionsTable inscriptions={inscriptions} />
      </CardContent>
    </Card>
  );
}
