CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS "idx_leads_profile_updated_at"
  ON "leads" ("profile_id", "updated_at" DESC);

CREATE INDEX IF NOT EXISTS "idx_leads_profile_status_updated_at"
  ON "leads" ("profile_id", "status", "updated_at" DESC);

CREATE INDEX IF NOT EXISTS "idx_leads_profile_source"
  ON "leads" ("profile_id", "source");

CREATE INDEX IF NOT EXISTS "idx_leads_profile_full_name"
  ON "leads" ("profile_id", "full_name");

CREATE INDEX IF NOT EXISTS "idx_leads_profile_email"
  ON "leads" ("profile_id", "email");

CREATE INDEX IF NOT EXISTS "idx_leads_profile_linkedin"
  ON "leads" ("profile_id", "linkedin_url");

CREATE INDEX IF NOT EXISTS "idx_leads_full_name_trgm"
  ON "leads" USING gin ("full_name" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "idx_leads_company_trgm"
  ON "leads" USING gin ("company" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "idx_leads_email_trgm"
  ON "leads" USING gin ("email" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "idx_leads_job_title_trgm"
  ON "leads" USING gin ("job_title" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "idx_leads_phone_trgm"
  ON "leads" USING gin ("phone" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "idx_lead_cadence_stage_queue"
  ON "lead_cadence_progress" ("profile_id", "status", "current_stage_order", "next_scheduled_at", "version");

CREATE INDEX IF NOT EXISTS "idx_lead_cadence_active_queue_partial"
  ON "lead_cadence_progress" ("profile_id", "status", "next_scheduled_at", "current_stage_order", "version")
  WHERE "finished_at" IS NULL;

CREATE INDEX IF NOT EXISTS "idx_lead_cadence_cadence_status"
  ON "lead_cadence_progress" ("cadence_id", "status");

CREATE INDEX IF NOT EXISTS "idx_templates_profile_channel"
  ON "templates" ("profile_id", "channel");

CREATE INDEX IF NOT EXISTS "idx_operators_profile_active_created"
  ON "operators" ("profile_id", "is_active", "created_at" DESC);

CREATE INDEX IF NOT EXISTS "idx_manual_actions_operator_queue"
  ON "lead_scheduled_actions" ("profile_id", "status", "created_by_operator_id", "scheduled_at");

CREATE INDEX IF NOT EXISTS "idx_manual_actions_pending_operator_queue_partial"
  ON "lead_scheduled_actions" ("profile_id", "created_by_operator_id", "scheduled_at")
  WHERE "status" = 'PENDING';

CREATE INDEX IF NOT EXISTS "idx_notifications_profile_read_created"
  ON "notifications" ("profile_id", "is_read", "created_at" DESC);

CREATE INDEX IF NOT EXISTS "idx_notifications_overdue_lookup"
  ON "notifications" ("profile_id", "lead_id", "type", "is_read");
