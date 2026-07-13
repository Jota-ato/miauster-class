CREATE TYPE "public"."roles" AS ENUM('admin', 'user', 'waiting');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'waiting'::"public"."roles";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE "public"."roles" USING "role"::"public"."roles";