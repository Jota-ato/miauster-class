"use client";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/shared/lib/utils";
import { GoogleLogo } from "./google-logo";
import { Spinner } from "@/shared/components/ui/spinner";
import { Route } from "next";

export default function GoogleAuthButton({
  mode = "signin",
  className,
  callbackURL = "/dashboard",
}: {
  mode?: "signin" | "signup";
  className?: string;
  callbackURL?: Route;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const label =
    mode === "signin" ? "Inicia sesión con Google" : "Regístrate con Google";

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch {
      toast.error(
        "Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.",
      );
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className={cn(
        "w-full gap-3 border border-gray-300 bg-white font-medium shadow-sm",
        "hover:bg-gray-50 hover:border-gray-400 hover:shadow-md",
        "active:bg-gray-100",
        "focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2",
        "transition-all duration-150",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className,
      )}
    >
      {isLoading ? <Spinner /> : <GoogleLogo />}
      <span>{isLoading ? "Conectando..." : label}</span>
    </Button>
  );
}
