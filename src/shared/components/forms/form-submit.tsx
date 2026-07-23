"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function FormSubmit({
  label,
  isSubmitting,
  isSubmittingLabel,
  className,
}: {
  label: string;
  isSubmitting: boolean;
  isSubmittingLabel: string;
  className?: string;
}) {
  return (
    <Button
      type="submit"
      className={cn("flex items-center gap-2", className)}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <Spinner /> {isSubmittingLabel}
        </span>
      ) : (
        label
      )}
    </Button>
  );
}
