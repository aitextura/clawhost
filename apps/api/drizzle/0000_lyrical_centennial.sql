CREATE TABLE IF NOT EXISTS "claw_exports" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"claw_id" text NOT NULL,
	"file_size" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "claws" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"provider" text DEFAULT 'hetzner' NOT NULL,
	"provider_server_id" text,
	"status" text DEFAULT 'creating' NOT NULL,
	"ip" text,
	"plan_id" text NOT NULL,
	"location" text,
	"root_password" text,
	"ssh_key_id" text,
	"subdomain" text,
	"gateway_token" text,
	"polar_subscription_id" text,
	"polar_product_id" text,
	"polar_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_price_id" text,
	"stripe_customer_id" text,
	"tier_id" text,
	"subscription_status" text DEFAULT 'pending',
	"billing_interval" text,
	"deletion_scheduled_at" timestamp with time zone,
	"last_reinstalled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "claws_subdomain_unique" UNIQUE("subdomain"),
	CONSTRAINT "claws_polar_subscription_id_unique" UNIQUE("polar_subscription_id"),
	CONSTRAINT "claws_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emails" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"feature" text NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "emails_user_feature" UNIQUE("user_id","feature")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "otp_codes" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"code_hash" text NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pending_claws" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"checkout_id" text NOT NULL,
	"name" text NOT NULL,
	"provider" text DEFAULT 'hetzner' NOT NULL,
	"plan_id" text NOT NULL,
	"location" text NOT NULL,
	"root_password" text,
	"ssh_key_id" text,
	"volume_size" integer,
	"price_monthly" integer NOT NULL,
	"billing_interval" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "pending_claws_checkout_id_unique" UNIQUE("checkout_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"last_sent_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ssh_keys" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"public_key" text NOT NULL,
	"fingerprint" text NOT NULL,
	"provider_key_id" integer,
	"digitalocean_key_id" integer,
	"vultr_key_id" integer,
	"contabo_key_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ssh_keys_user_fingerprint" UNIQUE("user_id","fingerprint")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"auth_methods" text[] DEFAULT '{}',
	"polar_customer_id" text,
	"has_license" boolean DEFAULT false NOT NULL,
	"stripe_customer_id" text,
	"litellm_user_id" text,
	"litellm_key_hash" text,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "volumes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"claw_id" text,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"provider_volume_id" integer,
	"location" text NOT NULL,
	"status" text DEFAULT 'creating' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "waitlist" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"user_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "claw_exports" ADD CONSTRAINT "claw_exports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "claw_exports" ADD CONSTRAINT "claw_exports_claw_id_claws_id_fk" FOREIGN KEY ("claw_id") REFERENCES "public"."claws"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "claws" ADD CONSTRAINT "claws_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "claws" ADD CONSTRAINT "claws_ssh_key_id_ssh_keys_id_fk" FOREIGN KEY ("ssh_key_id") REFERENCES "public"."ssh_keys"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emails" ADD CONSTRAINT "emails_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pending_claws" ADD CONSTRAINT "pending_claws_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pending_claws" ADD CONSTRAINT "pending_claws_ssh_key_id_ssh_keys_id_fk" FOREIGN KEY ("ssh_key_id") REFERENCES "public"."ssh_keys"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ssh_keys" ADD CONSTRAINT "ssh_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "volumes" ADD CONSTRAINT "volumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "volumes" ADD CONSTRAINT "volumes_claw_id_claws_id_fk" FOREIGN KEY ("claw_id") REFERENCES "public"."claws"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "waitlist" ADD CONSTRAINT "waitlist_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "claw_exports_claw_id_idx" ON "claw_exports" USING btree ("claw_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "claws_user_id_idx" ON "claws" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "claws_polar_subscription_id_idx" ON "claws" USING btree ("polar_subscription_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "claws_stripe_subscription_id_idx" ON "claws" USING btree ("stripe_subscription_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "claws_subdomain_idx" ON "claws" USING btree ("subdomain");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "claws_deletion_scheduled_at_idx" ON "claws" USING btree ("deletion_scheduled_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emails_user_id_idx" ON "emails" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "otp_codes_email_idx" ON "otp_codes" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pending_claws_user_id_idx" ON "pending_claws" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pending_claws_expires_at_idx" ON "pending_claws" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ssh_keys_user_id_idx" ON "ssh_keys" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "volumes_user_id_idx" ON "volumes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "volumes_claw_id_idx" ON "volumes" USING btree ("claw_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "waitlist_email_idx" ON "waitlist" USING btree ("email");