ALTER TABLE "post" RENAME TO "entry";--> statement-breakpoint
ALTER TABLE "entry" DROP CONSTRAINT "post_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "entry" ADD CONSTRAINT "entry_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;