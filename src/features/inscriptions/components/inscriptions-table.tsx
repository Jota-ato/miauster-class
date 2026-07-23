import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { formatCurrency } from "@/shared/utils/currency";
import { Badge } from "@/shared/components/ui/badge";
import { format } from "date-fns";
import { EyeButton } from "@/shared/components/ui/eye-button";
import { Inscription } from "../types/inscriptions.types";

const TABLE_HEADERS = [
  "Alumno",
  "Grupo",
  "Precio",
  "Estado",
  "Pagada",
  "Fecha",
  "Acciones",
] as const;

function ApprovalBadge({ approved }: { approved: boolean }) {
  return (
    <Badge variant={approved ? "default" : "secondary"}>
      {approved ? "Aprobada" : "Pendiente"}
    </Badge>
  );
}

function CommissionBadge({ paid }: { paid: boolean }) {
  return (
    <Badge variant={paid ? "destructive" : "secondary"}>
      {paid ? "¡Pagada!" : "En espera"}
    </Badge>
  );
}

function InscriptionRow({ inscription }: { inscription: Inscription }) {
  return (
    <TableRow>
      <TableCell>{inscription.studentNameSnapshot}</TableCell>
      <TableCell>{inscription.groupNameSnapshot}</TableCell>
      <TableCell>{formatCurrency(inscription.priceSnapshot)}</TableCell>
      <TableCell>
        <ApprovalBadge approved={inscription.approved} />
      </TableCell>
      <TableCell>
        <CommissionBadge paid={inscription.comissionPaid} />
      </TableCell>
      <TableCell>{format(inscription.createdAt, "dd/MM/yyyy")}</TableCell>
      <TableCell>
        <EyeButton
          aria-label="Ver detalles"
          href={`/dashboard/inscriptions/${inscription.id}`}
        />
      </TableCell>
    </TableRow>
  );
}

function EmptyState() {
  return (
    <TableRow>
      <TableCell
        colSpan={TABLE_HEADERS.length}
        className="text-center text-muted-foreground"
      >
        No hay inscripciones registradas en este periodo.
      </TableCell>
    </TableRow>
  );
}

export function InscriptionsTable({
  inscriptions,
}: {
  inscriptions: Inscription[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TABLE_HEADERS.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {inscriptions.length === 0 ? (
          <EmptyState />
        ) : (
          inscriptions.map((inscription) => (
            <InscriptionRow key={inscription.id} inscription={inscription} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
