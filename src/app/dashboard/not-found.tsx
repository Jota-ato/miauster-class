import Link from "next/link";

import { ArrowLeft, Home, SearchX } from "lucide-react";

import { Container } from "@/shared/components/layout/container";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Heading } from "@/shared/components/typography/heading";

export default function NotFoundPage() {
  return (
    <>
      <Card className="mx-auto max-w-3xl shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="tracking-widest"
            >
              404
            </Badge>
          </div>
          <CardTitle>
            <Heading className="text-balance text-center text-2xl">
              Parece que esta página no existe
            </Heading>
          </CardTitle>
          <CardDescription className="mx-auto text-center text-base">
            El enlace pudo cambiar, la URL puede estar mal escrita o quizá este
            contenido ya no está disponible.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/70 bg-muted/40 px-6 py-8 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
              <SearchX className="size-10" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                No encontramos el recurso solicitado
              </p>
              <p className="text-sm text-muted-foreground">
                Si llegaste desde un marcador, revisa la dirección. Si vienes
                navegando por la app, vuelve a un punto seguro.
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-background px-4 py-3">
              <p className="text-sm font-medium">Vuelve al dashboard</p>
              <p className="text-sm text-muted-foreground">
                Retoma la navegación en el panel principal.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background px-4 py-3">
              <p className="text-sm font-medium">O regresa al inicio</p>
              <p className="text-sm text-muted-foreground">
                Si prefieres, empieza desde la portada pública.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            render={<Link href="/dashboard" />}
            nativeButton={false}
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            Volver al dashboard
          </Button>
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Home className="size-4" />
            Ir al inicio
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
