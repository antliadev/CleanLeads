-- CreateEnum
CREATE TYPE "ManualActionType" AS ENUM ('LIGACAO', 'REUNIAO', 'EMAIL', 'WHATSAPP', 'LINKEDIN', 'TAREFA');

-- CreateEnum
CREATE TYPE "ManualActionChannel" AS ENUM ('EMAIL', 'LINKEDIN', 'WHATSAPP', 'TELEFONE', 'PRESENCIAL', 'OUTRO');

-- CreateEnum
CREATE TYPE "ManualActionStatus" AS ENUM ('PENDING', 'DONE', 'CANCELED', 'MISSED');

-- CreateTable
CREATE TABLE "lead_scheduled_actions" (
    "id"                       TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "profile_id"               TEXT NOT NULL,
    "lead_id"                  TEXT NOT NULL,
    "title"                    TEXT NOT NULL,
    "action_type"              "ManualActionType" NOT NULL DEFAULT 'TAREFA',
    "channel"                  "ManualActionChannel",
    "notes"                    TEXT,
    "scheduled_at"             TIMESTAMP(3) NOT NULL,
    "status"                   "ManualActionStatus" NOT NULL DEFAULT 'PENDING',
    "created_by_operator_id"   TEXT,
    "completed_by_operator_id" TEXT,
    "completed_at"             TIMESTAMP(3),
    "completion_notes"         TEXT,
    "created_at"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_scheduled_actions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lead_scheduled_actions_profile_id_status_scheduled_at_idx" ON "lead_scheduled_actions"("profile_id", "status", "scheduled_at");

-- CreateIndex
CREATE INDEX "lead_scheduled_actions_lead_id_idx" ON "lead_scheduled_actions"("lead_id");

-- CreateIndex
CREATE INDEX "lead_scheduled_actions_created_by_operator_id_idx" ON "lead_scheduled_actions"("created_by_operator_id");

-- AddForeignKey
ALTER TABLE "lead_scheduled_actions" ADD CONSTRAINT "lead_scheduled_actions_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_scheduled_actions" ADD CONSTRAINT "lead_scheduled_actions_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_scheduled_actions" ADD CONSTRAINT "lead_scheduled_actions_created_by_operator_id_fkey" FOREIGN KEY ("created_by_operator_id") REFERENCES "operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_scheduled_actions" ADD CONSTRAINT "lead_scheduled_actions_completed_by_operator_id_fkey" FOREIGN KEY ("completed_by_operator_id") REFERENCES "operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
