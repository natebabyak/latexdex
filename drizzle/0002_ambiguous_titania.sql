CREATE TABLE "entry_tags" (
	"entry_id" text NOT NULL,
	"tag_id" text NOT NULL,
	CONSTRAINT "entry_tags_entry_id_tag_id_pk" PRIMARY KEY("entry_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "saved_entries" (
	"user_id" text NOT NULL,
	"entry_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "saved_entries_user_id_entry_id_pk" PRIMARY KEY("user_id","entry_id")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"use_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tag_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "entry" ALTER COLUMN "title" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "entry" ALTER COLUMN "description" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "entry" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "copy_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "save_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "view_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "entry_tags" ADD CONSTRAINT "entry_tags_entry_id_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entry_tags" ADD CONSTRAINT "entry_tags_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_entries" ADD CONSTRAINT "saved_entries_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_entries" ADD CONSTRAINT "saved_entries_entry_id_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "entry_tags_tag_id_idx" ON "entry_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "saved_entries_user_id_idx" ON "saved_entries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "tag_title_idx" ON "tag" USING btree ("title");--> statement-breakpoint
CREATE INDEX "tag_use_count_idx" ON "tag" USING btree ("use_count");--> statement-breakpoint
CREATE INDEX "entry_title_idx" ON "entry" USING btree ("title");--> statement-breakpoint
CREATE INDEX "entry_user_id_idx" ON "entry" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "entry_copy_count_idx" ON "entry" USING btree ("copy_count");--> statement-breakpoint
CREATE INDEX "entry_save_count_idx" ON "entry" USING btree ("save_count");--> statement-breakpoint
CREATE INDEX "entry_view_count_idx" ON "entry" USING btree ("view_count");