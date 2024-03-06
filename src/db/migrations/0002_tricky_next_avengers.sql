DO $$ BEGIN
 CREATE TYPE "employmentType" AS ENUM('newGraduate', 'midCareer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "interview" ADD COLUMN "employmentType" "employmentType" NOT NULL;