"use client";
import { Button } from "@/shared/components/ui/button";
import { User } from "../types/user.types";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { showResponse } from "@/shared/lib/client-actions";
import { deleteOwnUserAction } from "../actions/user-actions";
import { Spinner } from "@/shared/components/ui/spinner";
import { useState } from "react";

export function DeleteOwnUser({ user }: { user: User }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAction = async () => {
    setIsDeleting(true);
    showResponse(await deleteOwnUserAction(user.id, user.id));
    setIsDeleting(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive" />}
        className="flex items-center"
      >
        <Trash className="w-4 h-4" />
        Borrar cuenta
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de que deseas eliminar tu cuenta?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Todas tus inscripciones se
            conservarán, pero perderás el acceso a tu cuenta y a la información
            asociada a ella.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteAction}>
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Eliminando...
              </span>
            ) : (
              "Eliminar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
