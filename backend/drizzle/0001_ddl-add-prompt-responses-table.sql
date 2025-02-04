CREATE TABLE "promptResponses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"display_order" integer NOT NULL,
	"prompt_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "promptResponses" ADD CONSTRAINT "promptResponses_prompt_id_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompts"("id") ON DELETE no action ON UPDATE no action;