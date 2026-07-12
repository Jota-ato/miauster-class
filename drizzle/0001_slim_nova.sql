ALTER TABLE "groups" ALTER COLUMN "start_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "end_date" date NOT NULL;