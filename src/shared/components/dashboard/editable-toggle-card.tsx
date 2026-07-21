"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { Eye, PenSquare } from "lucide-react";

interface EditableToggleCardProps {
  viewComponent: ReactNode;
  editComponent: ReactNode;
  editLabel?: string;
  viewLabel?: string;
  className?: string;
  onToggle?: (isEditing: boolean) => void;
}

export function EditableToggleCard({
  viewComponent,
  editComponent,
  editLabel = "Editar",
  viewLabel = "Ver detalles",
  className = "",
  onToggle,
}: EditableToggleCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    setIsEditing((prev) => {
      const nextState = !prev;
      onToggle?.(nextState);
      return nextState;
    });
  };

  return (
    <div className={className}>
      <Button onClick={handleToggle} className="mb-4">
        {isEditing ? (
          <>
            <Eye className="size-4" />
            {viewLabel}
          </>
        ) : (
          <>
            <PenSquare className="size-4" />
            {editLabel}
          </>
        )}
      </Button>

      <div>{isEditing ? editComponent : viewComponent}</div>
    </div>
  );
}
