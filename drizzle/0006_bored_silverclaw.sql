ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'waiting'::text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('admin', 'seller', 'waiting');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'waiting'::"public"."roles";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE "public"."roles" USING "role"::"public"."roles";