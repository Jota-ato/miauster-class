import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { formatCurrency } from "@/shared/utils/currency";
import { format } from "date-fns";
import { Inscription } from "../types/inscriptions.types";
import Link from "next/link";

function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="text-sm font-medium">{children}</div>
    </div>
  );
}

export function DetailInscriptionCard({
  inscription,
}: {
  inscription: Inscription;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="font-mono text-base">
              {inscription.id}
            </CardTitle>
            <CardDescription>
              Vendedor: {inscription.creatorNameSnapshot}
            </CardDescription>
          </div>
          <Badge variant={inscription.approved ? "default" : "secondary"}>
            {inscription.approved ? "Aprobada" : "Pendiente"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <DetailField label="Alumno">
            {inscription.studentNameSnapshot}
          </DetailField>
          <DetailField label="Grupo">
            <Link href={`/dashboard/groups/${inscription.groupId}`}>
              {inscription.groupNameSnapshot}
            </Link>
          </DetailField>
          <DetailField label="Inicio de grupo">
            {inscription.groupStartDateSnapshot}
          </DetailField>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <DetailField label="Precio">
            {formatCurrency(inscription.priceSnapshot)}
          </DetailField>
          <DetailField label="Extra">
            {formatCurrency(inscription.extraPrice)}
          </DetailField>
          <DetailField label="Comisión">
            <Badge
              variant={inscription.comissionPaid ? "destructive" : "secondary"}
            >
              {inscription.comissionPaid ? "¡Pagada!" : "En espera"}
            </Badge>
          </DetailField>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-muted-foreground">
          <DetailField label="Creado">
            {format(inscription.createdAt, "dd/MM/yyyy HH:mm")}
          </DetailField>
          <DetailField label="Actualizado">
            {format(inscription.updatedAt, "dd/MM/yyyy HH:mm")}
          </DetailField>
        </div>
      </CardContent>
    </Card>
  );
}
