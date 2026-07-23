"use client";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { ReceiptText } from "lucide-react";
import { Inscription } from "../types/inscriptions.types";
import Image from "next/image";

export function InvoiceImageDialog({ inscription }: { inscription: Inscription }) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" className="text-foreground" />}
      >
        <ReceiptText />
        Imagen
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Factura de {inscription.studentNameSnapshot}
            </DialogTitle>
            <DialogDescription>
                Inscrito por: {inscription.creatorNameSnapshot}
            </DialogDescription>
        </DialogHeader>
        <Image 
            src={inscription.invoiceImage}
            alt="Factura"
            width={400}
            height={800}
            className="aspect-3/4"
        />
      </DialogContent>
    </Dialog>
  );
}
