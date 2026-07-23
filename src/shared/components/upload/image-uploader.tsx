"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ImageIcon, X, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import { compressImage } from "@/shared/lib/image-compression";
import { UploadDropzone, uploadFiles } from "@/shared/lib/uploadthing";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ImageUploaderProps {
  label: string;
  onChange: (url: string | null) => void;
  image?: string;
  error?: string | null;
}

export default function ImageUploader({
  label,
  onChange,
  image,
  error,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleDrop = async (files: File[]) => {
    if (!files || files.length === 0) return;

    try {
      setIsCompressing(true);
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          return await compressImage(file, {
            maxSizeMB: 2,
            maxWidthOrHeight: 1440,
          });
        }),
      );
      setIsCompressing(false);

      setIsUploading(true);
      toast.info("Iniciando subida al storage...");

      const res = await uploadFiles("imageUploader", {
        files: compressedFiles,
      });

      setIsUploading(false);

      const fileUrl = res?.[0]?.ufsUrl;
      if (fileUrl) {
        onChange(fileUrl);
        toast.success("Imagen optimizada y subida correctamente");
      }
    } catch (error: any) {
      setIsCompressing(false);
      setIsUploading(false);
      const errorMessage = error?.message ?? "Error desconocido en el proceso";
      toast.error(`Error en el proceso: ${errorMessage}`);
      console.error("Upload error under the hood:", error);
    }
  };

  const isLoadingState = isUploading || isCompressing;

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>

      {image ? (
        <div className="relative group rounded-xl overflow-hidden border border-border md:h-80 h-60 w-full">
          <Image
            src={image}
            fill
            alt="Portada de la comunidad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              type="button"
              onClick={() => {
                onChange(null);
              }}
              className="flex items-center gap-1.5 text-xs font-medium bg-white text-black rounded-lg px-3 py-1.5 hover:bg-destructive hover:text-destructive-foreground transition-colors duration-300"
            >
              <X className="size-4" />
              Cambiar imagen
            </Button>
          </div>
          <Badge className="absolute top-2 right-2">
            <CheckCircle2 className="size-4" />
            Subida
          </Badge>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onChange={handleDrop}
          content={{
            label: isCompressing
              ? "Optimizando peso de la imagen..."
              : isUploading
                ? "Subiendo imagen..."
                : "Arrastra una imagen aquí",
            allowedContent: "PNG, JPG o WEBP",
            button() {
              if (isCompressing) return "Procesando...";
              if (isUploading) return "Subiendo...";
              return "Seleccionar archivo";
            },
            uploadIcon: () =>
              isLoadingState ? (
                <Loader2 className="size-8 text-primary animate-spin" />
              ) : (
                <ImageIcon className="size-8 text-muted-foreground" />
              ),
          }}
          appearance={{
            container: `
                            flex flex-col items-center justify-center
                            border-2 border-dashed rounded-md
                            h-60 w-full cursor-pointer
                            transition-colors duration-300
                            
                            ${
                              isLoadingState
                                ? "border-primary/50 bg-primary/5 pointer-events-none"
                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                            }
                            ${
                              error ? "border-destructive/50 bg-destructive/5" : ""
                            }
                        `,
            uploadIcon: "size-8 stroke-muted-foreground",
            label: "text-sm font-medium text-foreground",
            allowedContent: "text-xs text-muted-foreground",
            button: `
                            hidden
                        `,
          }}
        />
      )}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
