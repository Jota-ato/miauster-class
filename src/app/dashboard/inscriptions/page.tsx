import { inscriptionService } from "@/features/inscriptions/services/inscriptions-service";
import { UsersPolicies } from "@/features/users/policies/user-policies";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { endOfWeek, startOfWeek } from "date-fns";
import { BookMarked, Copy, Gift, TrendingUp } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export interface SellerWeeklyGoal {
  currentInscriptions: number;
  targetInscriptions: number;
  estimatedEarnings: number;
}

export default async function InscriptionsPage() {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");
  if (!UsersPolicies.isSeller(user)) redirect("/not-authorized");
  const startRange = startOfWeek(new Date());
  const endRange = endOfWeek(new Date());
  const weeklyInscriptions = await inscriptionService.getInscriptionsByRangeAndUserId(
    user.id,
    startRange,
    endRange
  )

  const weeklyStats = {
    current: weeklyInscriptions.length,
    target: 3,
    estimatedEarnings: weeklyInscriptions.reduce((acc, inscription) => acc + +inscription.priceSnapshot, 0)
  };

  const progressPercentage = Math.min(
    (weeklyStats.current / weeklyStats.target) * 100,
    100,
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Heading className="text-left">Inscripciones</Heading>
          <p className="text-sm text-muted-foreground">
            Gestiona la matriculación de alumnos y revisa tu rendimiento
            semanal.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/inscriptions/create" />}
          nativeButton={false}
          size="lg"
          className="w-full sm:w-auto"
        >
          <BookMarked className="size-4" /> Inscribir Estudiante
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm md:text-base font-medium flex items-center gap-2">
                <Gift className="h-4 w-4 text-primary shrink-0" /> Meta Semanal de
                Bonificación
              </CardTitle>
              <Badge variant="default">
                {weeklyStats.current} / {weeklyStats.target} 
                <span className="hidden md:block">Completadas</span>
              </Badge>
            </div>
            <CardDescription>
              {weeklyStats.target - weeklyStats.current > 0 ? `¡Inscribe ${weeklyStats.target - weeklyStats.current} estudiante(s) más esta semana para obtener tu semana gratis!` : "¡Felicidades! Has alcanzado tu meta semanal de inscripciones."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden mt-2">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 text-emerald-800 dark:text-emerald-500" /> Ganancias
              Estimadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${weeklyStats.estimatedEarnings.toLocaleString("es-MX")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Acumulado de comisión semanal
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Acciones rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Copy className="h-4 w-4" /> Copiar Link de Registro Directo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inscripciones Recientes</CardTitle>
          <CardDescription>
            Historial de alumnos inscritos en el periodo actual.
          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </>
  );
}
