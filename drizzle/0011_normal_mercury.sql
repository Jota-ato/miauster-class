ALTER TABLE "inscriptions" ADD COLUMN "approved" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "inscriptions" ADD COLUMN "paid" boolean DEFAULT false NOT NULL;