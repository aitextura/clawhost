-- Clawds: add tier/token columns to claws + new tables
ALTER TABLE "claws" ADD COLUMN IF NOT EXISTS "tier" text DEFAULT 'starter';
ALTER TABLE "claws" ADD COLUMN IF NOT EXISTS "token_limit_daily" integer DEFAULT 100000;
ALTER TABLE "claws" ADD COLUMN IF NOT EXISTS "tokens_used_today" integer DEFAULT 0;
ALTER TABLE "claws" ADD COLUMN IF NOT EXISTS "token_reset_at" timestamp with time zone;
ALTER TABLE "claws" ADD COLUMN IF NOT EXISTS "llm_keys_mode" text DEFAULT 'platform';
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "llm_api_keys" (
	"id" text PRIMARY KEY NOT NULL,
	"claw_id" text NOT NULL,
	"provider" text NOT NULL,
	"encrypted_key" text NOT NULL,
	"key_hint" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token_purchases" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"stripe_purchase_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token_usage" (
	"id" text PRIMARY KEY NOT NULL,
	"claw_id" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"tokens_used" integer DEFAULT 0 NOT NULL,
	"model" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "llm_api_keys" ADD CONSTRAINT "llm_api_keys_claw_id_claws_id_fk" FOREIGN KEY ("claw_id") REFERENCES "public"."claws"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_purchases" ADD CONSTRAINT "token_purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token_usage" ADD CONSTRAINT "token_usage_claw_id_claws_id_fk" FOREIGN KEY ("claw_id") REFERENCES "public"."claws"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "llm_api_keys_claw_id_idx" ON "llm_api_keys" USING btree ("claw_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "token_purchases_user_id_idx" ON "token_purchases" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "token_usage_claw_id_idx" ON "token_usage" USING btree ("claw_id");
