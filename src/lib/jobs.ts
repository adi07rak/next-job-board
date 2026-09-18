/**
 * Data access layer — all job-related database queries live here.
 *
 * Keeping queries in one file means:
 *  - Easy to swap Prisma for another ORM later
 *  - Server Components just import and call, no boilerplate
 *  - Type safety all the way from DB → component
 */

import { db } from "@/lib/prisma";

// SQLite doesn't support native enums, so Prisma doesn't export them
// as runtime values. We define them here as const objects instead —
// same type safety and autocomplete, no import error.
export const JobType = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  CONTRACT: "CONTRACT",
  INTERNSHIP: "INTERNSHIP",
} as const;
export type JobType = (typeof JobType)[keyof typeof JobType];

export const JobStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  CLOSED: "CLOSED",
} as const;
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

// ── Types ──────────────────────────────────────────────────────────────────

export type JobWithAuthor = Awaited<ReturnType<typeof getJobById>>;
export type JobSummary = Awaited<ReturnType<typeof getAllJobs>>[number];

// ── Helpers ────────────────────────────────────────────────────────────────

/** Parse the comma-separated tags string into an array */
export function parseTags(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Parse JSON-encoded requirements/niceToHave back into string[] */
export function parseList(json: string | null): string[] {
  if (!json) return [];
  try {
    return JSON.parse(json) as string[];
  } catch {
    return [];
  }
}

/** Human-readable job type label */
export function formatJobType(type: JobType): string {
  const map: Record<JobType, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
  };
  return map[type];
}

// ── Queries ────────────────────────────────────────────────────────────────

/**
 * Get all active jobs, optionally filtered by search query or location.
 * Used on the /jobs listing page (SSG with ISR).
 */
export async function getAllJobs(filters?: {
  query?: string;
  location?: string;
  type?: JobType;
}) {
  return db.job.findMany({
    where: {
      status: JobStatus.ACTIVE,
      ...(filters?.query && {
        OR: [
          { title: { contains: filters.query } },
          { company: { contains: filters.query } },
          { tags: { contains: filters.query } },
        ],
      }),
      ...(filters?.location && {
        location: { contains: filters.location },
      }),
      ...(filters?.type && { type: filters.type }),
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get a single job by ID — used on the /jobs/[id] detail page.
 * Returns null if not found (triggers not-found.tsx).
 */
export async function getJobById(id: string) {
  return db.job.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
  });
}

/**
 * Get all jobs posted by a specific employer — used on /dashboard.
 * Returns all statuses (ACTIVE, PAUSED, DRAFT) so the employer can manage them.
 */
export async function getJobsByAuthor(authorId: string) {
  return db.job.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Increment the view count when someone opens a job detail page.
 * Fire-and-forget — don't await this in the critical path.
 */
export async function incrementJobViews(id: string) {
  return db.job.update({
    where: { id },
    data: { views: { increment: 1 } },
  });
}

/**
 * Create a new job listing.
 * Called from the Server Action in the Post a Job form.
 */
export async function createJob(data: {
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: JobType;
  description: string;
  requirements: string[];
  niceToHave?: string[];
  tags: string[];
  logo?: string;
  authorId: string;
}) {
  return db.job.create({
    data: {
      title: data.title,
      company: data.company,
      location: data.location,
      salary: data.salary,
      type: data.type,
      description: data.description,
      requirements: JSON.stringify(data.requirements),
      niceToHave: data.niceToHave ? JSON.stringify(data.niceToHave) : null,
      tags: data.tags.join(","),
      logo: data.logo,
      authorId: data.authorId,
    },
  });
}

/**
 * Update a job's status (ACTIVE → PAUSED, etc.).
 * Called from the dashboard management buttons.
 */
export async function updateJobStatus(id: string, status: JobStatus) {
  return db.job.update({
    where: { id },
    data: { status },
  });
}

/**
 * Delete a job listing.
 * Only called after verifying the logged-in user is the author.
 */
export async function deleteJob(id: string) {
  return db.job.delete({ where: { id } });
}
