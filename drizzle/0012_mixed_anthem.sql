ALTER TABLE "inscriptions" ADD COLUMN "extra_price" numeric(10, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
CREATE INDEX "students_name_trgm_idx" ON "students" USING gin ("name" gin_trgm_ops);