/**
 * Prisma Client singleton
 *
 * In development, Next.js hot-reload creates new module instances on every
 * change — naively calling `new PrismaClient()` each time would exhaust your
 * database connection pool quickly.
 *
 * The pattern below stores one client on the Node.js `global` object so it
 * survives hot-reloads. In production every process starts fresh, so there's
 * no global needed.
 *
 * Usage anywhere in your app (Server Components, API routes, Server Actions):
 *
 *   import { db } from "@/lib/prisma";
 *   const jobs = await db.job.findMany();
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// need to create job-page.tsx point:::::::
