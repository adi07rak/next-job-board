/**
 * GET  /api/jobs        — list all active jobs (supports ?q= and ?location=)
 * POST /api/jobs        — create a new job (auth will be added in Week 3)
 */

import { NextResponse } from "next/server";
import { getAllJobs, createJob, JobType } from "@/lib/jobs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? undefined;
  const location = searchParams.get("location") ?? undefined;

  const jobs = await getAllJobs({ query, location });
  return NextResponse.json({ jobs, total: jobs.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    company,
    location,
    salary,
    type,
    description,
    requirements,
    niceToHave,
    tags,
    logo,
    authorId,
  } = body;

  if (!title || !company || !location || !description || !authorId) {
    return NextResponse.json(
      {
        error:
          "title, company, location, description, and authorId are required",
      },
      { status: 400 },
    );
  }

  const job = await createJob({
    title,
    company,
    location,
    salary,
    type: (type as JobType) ?? JobType.FULL_TIME,
    description,
    requirements: requirements ?? [],
    niceToHave: niceToHave ?? [],
    tags: Array.isArray(tags) ? tags : (tags ?? "").split(","),
    logo,
    authorId,
  });

  return NextResponse.json(job, { status: 201 });
}
