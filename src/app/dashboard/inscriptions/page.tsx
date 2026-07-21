import { UsersPolicies } from "@/features/users/policies/user-policies";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
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

  const weeklyStats = {
    current: 2,
    target: 3,
    estimatedEarnings: 1500
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
          <BookMarked className="mr-2 h-5 w-5" /> Inscribir Estudiante
        </Button>
      </div>

      {/* Grid de Estado y Gamificación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Meta Semanal con Progreso Visual */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Gift className="h-4 w-4 text-primary" /> Meta Semanal de
                Bonificación
              </CardTitle>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                {weeklyStats.current} / {weeklyStats.target} Completadas
              </span>
            </div>
            <CardDescription>
              ¡Inscribe {3 - weeklyStats.current} estudiante(s) más esta semana
              para obtener tu semana gratis!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Barra de progreso nativa/Tailwind */}
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden mt-2">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Ganancias Estimadas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-500" /> Ganancias
              Estimadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${weeklyStats.estimatedEarnings.toLocaleString("es-MX")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Acumulado de comisión semanal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas Complementarias */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Acciones rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Copy className="h-4 w-4" /> Copiar Link de Registro Directo
          </Button>
          {/* Agregar más disparadores útiles aquí */}
        </CardContent>
      </Card>

      {/* Tabla de Inscripciones */}
      <Card>
        <CardHeader>
          <CardTitle>Inscripciones Recientes</CardTitle>
          <CardDescription>
            Historial de alumnos inscritos en el periodo actual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Componente de Tabla / DataGrid irá aquí */}
        </CardContent>
      </Card>
    </>
  );
}
