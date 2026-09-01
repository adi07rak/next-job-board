import { NextResponse } from "next/server";

// Mock data — in Week 2 this will query a real Prisma database
const jobs = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    location: "Remote",
    salary: "$140k–$180k",
    type: "Part-time",
    tags: ["React", "TypeScript"],
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Linear",
    location: "San Francisco",
    salary: "$120k–$150k",
    type: "Full-time",
    tags: ["Figma", "Design systems"],
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Planetscale",
    location: "Remote",
    salary: "$130k–$160k",
    type: "Full-time",
    tags: ["Go", "MySQL"],
  },
  {
    id: "4",
    title: "Staff Engineer",
    company: "Stripe",
    location: "New York",
    salary: "$180k–$240k",
    type: "Full-time",
    tags: ["Distributed systems"],
  },
];

// GET /api/jobs — returns all jobs, supports ?q= search and ?location= filter
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();
  const location = searchParams.get("location")?.toLowerCase();

  let results = jobs;

  if (query) {
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(query) ||
        j.company.toLowerCase().includes(query) ||
        j.tags.some((t) => t.toLowerCase().includes(query)),
    );
  }

  if (location) {
    results = results.filter((j) =>
      j.location.toLowerCase().includes(location),
    );
  }

  return NextResponse.json({ jobs: results, total: results.length });
}

// POST /api/jobs — creates a new job (auth will be added in Week 3)
export async function POST(request: Request) {
  const body = await request.json();

  const { title, company, location, salary, type, tags } = body;
  if (!title || !company || !location) {
    return NextResponse.json(
      { error: "title, company, and location are required" },
      { status: 400 },
    );
  }

  // In Week 2 this will be: await prisma.job.create({ data: { ... } })
  const newJob = {
    id: String(Date.now()),
    title,
    company,
    location,
    salary: salary ?? "Competitive",
    type: type ?? "Full-time",
    tags: tags ?? [],
  };

  return NextResponse.json(newJob, { status: 201 });
}
