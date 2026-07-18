"use client";
import { PenSquare } from "lucide-react";
import { useLanguageLevelStore } from "../stores/language-level-store";

export function EditLanguageLevelFlag() {
  const { setDialogOpen } = useLanguageLevelStore();

  return (
    <div
      className="inline-flex mt-4 md:mt-0 w-full md:w-auto items-center justify-center gap-2 border-2 border-dashed p-4 rounded-md cursor-pointer hover:border-accent-foreground hover:text-accent-foreground transition-colors duration-300 group"
      onClick={() => setDialogOpen(true)}
    >
      <span>Editar idiomas disponibles</span>
      <PenSquare className="stroke-1 group-hover:stroke-accent-foreground transition-colors duration-300" />
    </div>
  );
}
