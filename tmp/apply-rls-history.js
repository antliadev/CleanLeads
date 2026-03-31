require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
});

async function run() {
  try {
    console.log("Aplicando RLS na tabela lead_histories...");
    await pool.query(`
      ALTER TABLE public.lead_histories ENABLE ROW LEVEL SECURITY;

      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'LeadHistory allow ALL for own profile' AND tablename = 'lead_histories'
          ) THEN
              CREATE POLICY "LeadHistory allow ALL for own profile" ON public.lead_histories
                  FOR ALL TO authenticated
                  USING (
                      lead_id IN (
                          SELECT id FROM public.leads WHERE profile_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid()::text LIMIT 1)
                      )
                  );
          END IF;
      END $$;
    `);
    console.log("RLS aplicado com sucesso na tabela history.");
  } catch (error) {
    console.error("Erro ao aplicar RLS:", error);
  } finally {
    pool.end();
  }
}

run();
