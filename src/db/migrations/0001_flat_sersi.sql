CREATE TABLE IF NOT EXISTS "interview" (
	"id" text PRIMARY KEY NOT NULL,
	"occupation" text NOT NULL,
	"questionsAndAnswers" text NOT NULL,
	"score" integer NOT NULL,
	"feedBack" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interview" ADD CONSTRAINT "interview_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
