import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Usa session mode (porta 5432) para migrações/DDL
    url: process.env["DATABASE_URL"]?.replace(":6543", ":5432").replace("?pgbouncer=true", "") || process.env["DATABASE_URL"],
  },
});
