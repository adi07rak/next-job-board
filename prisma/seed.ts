/**
 * Prisma seed script
 * Run with: npx prisma db seed
 *
 * Creates:
 *  - 1 employer user  (alice@acme.com)
 *  - 1 jobseeker user (bob@example.com)
 *  - 8 realistic job listings owned by Alice
 */

import { PrismaClient } from "@prisma/client";

const JobType = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  CONTRACT: "CONTRACT",
  INTERNSHIP: "INTERNSHIP",
} as const;

const JobStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  CLOSED: "CLOSED",
} as const;

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Clean slate ───────────────────────────────────────────────────────────
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();

  // ── Users ─────────────────────────────────────────────────────────────────
  const employer = await prisma.user.create({
    data: {
      email: "alice@acme.com",
      name: "Alice Chen",
      role: "EMPLOYER",
    },
  });

  await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob Smith",
      role: "JOBSEEKER",
    },
  });

  console.log(
    `✅ Created users: ${employer.name} (EMPLOYER) + Bob Smith (JOBSEEKER)`,
  );

  // ── Jobs ──────────────────────────────────────────────────────────────────
  const jobs = [
    {
      title: "Senior Frontend Engineer",
      company: "Vercel",
      location: "Remote",
      salary: "$140k–$180k",
      type: JobType.FULL_TIME,
      status: JobStatus.ACTIVE,
      logo: "V",
      tags: "React,TypeScript,Next.js",
      description:
        "We're looking for a Senior Frontend Engineer to help build the next generation of developer tools. You'll work across the Vercel dashboard, CLI, and open-source projects used by millions of developers worldwide.",
      requirements: JSON.stringify([
        "5+ years of production React experience",
        "Deep familiarity with TypeScript and modern JavaScript",
        "Experience with performance optimization and Core Web Vitals",
        "Ability to ship independently and collaborate asynchronously",
      ]),
      niceToHave: JSON.stringify([
        "Contributions to open-source projects",
        "Experience with Rust or WebAssembly",
        "Familiarity with edge computing concepts",
      ]),
    },
    {
      title: "Product Designer",
      company: "Linear",
      location: "San Francisco, CA",
      salary: "$120k–$150k",
      type: JobType.FULL_TIME,
      status: JobStatus.ACTIVE,
      logo: "L",
      tags: "Figma,Design systems,Product thinking",
      description:
        "Linear is looking for a Product Designer to help shape the future of project management. You'll design features used by thousands of high-performing engineering teams.",
      requirements: JSON.stringify([
        "4+ years of product design experience in SaaS",
        "Expert-level Figma skills and a strong portfolio",
        "Ability to think in systems, not just screens",
        "Fluency working with engineers during implementation",
      ]),
      niceToHave: JSON.stringify([
        "Experience with design tokens and component libraries",
        "Background in developer tooling or B2B software",
        "Some familiarity with CSS/HTML",
      ]),
    },
    {
      title: "Backend Engineer",
      company: "Planetscale",
      location: "Remote",
      salary: "$130k–$160k",
      type: JobType.FULL_TIME,
      status: JobStatus.ACTIVE,
      logo: "P",
      tags: "Go,MySQL,Distributed systems",
      description:
        "Join our database infrastructure team to build the systems that power PlanetScale's globally distributed MySQL platform. You'll work on the core query engine, replication layer, and developer-facing APIs.",
      requirements: JSON.stringify([
        "4+ years of backend engineering experience",
        "Proficiency in Go or another systems language",
        "Experience with databases, storage engines, or distributed systems",
        "Strong debugging and performance profiling skills",
      ]),
      niceToHave: JSON.stringify([
        "Prior experience contributing to open-source database projects",
        "Understanding of Vitess internals",
        "Experience with Kubernetes-based infrastructure",
      ]),
    },
    {
      title: "Staff Engineer",
      company: "Stripe",
      location: "New York, NY",
      salary: "$180k–$240k",
      type: JobType.FULL_TIME,
      status: JobStatus.ACTIVE,
      logo: "S",
      tags: "Distributed systems,Python,Ruby",
      description:
        "Stripe's Payments team is hiring a Staff Engineer to lead architecture decisions across a complex, high-availability payment infrastructure. You'll set technical direction, mentor senior engineers, and drive cross-team initiatives.",
      requirements: JSON.stringify([
        "8+ years of software engineering experience",
        "Deep expertise in distributed systems and large-scale APIs",
        "Demonstrated track record of technical leadership",
        "Excellent written communication for async collaboration",
      ]),
      niceToHave: JSON.stringify([
        "Experience in fintech or payments infrastructure",
        "Background in developer platform or API design",
        "Prior staff or principal engineer title",
      ]),
    },
    {
      title: "DevOps Engineer",
      company: "Fly.io",
      location: "Remote",
      salary: "$120k–$155k",
      type: JobType.FULL_TIME,
      status: JobStatus.ACTIVE,
      logo: "F",
      tags: "Kubernetes,Rust,Linux",
      description:
        "We're building a new kind of cloud — one that runs apps close to users around the world. As a DevOps Engineer, you'll help build and maintain the infrastructure that makes Fly's global network fast and reliable.",
      requirements: JSON.stringify([
        "Strong Linux systems knowledge",
        "Experience with container orchestration (Kubernetes, Nomad, or similar)",
        "Comfort working in a distributed, async-first team",
        "Solid debugging skills across the networking and OS stack",
      ]),
      niceToHave: JSON.stringify([
        "Rust or C experience",
        "Familiarity with BGP routing or Anycast networking",
        "Experience with Firecracker or QEMU",
      ]),
    },
    {
      title: "iOS Engineer",
      company: "Notion",
      location: "Remote",
      salary: "$130k–$165k",
      type: JobType.FULL_TIME,
      status: JobStatus.ACTIVE,
      logo: "N",
      tags: "Swift,SwiftUI,iOS",
      description:
        "Notion's mobile team is looking for an iOS Engineer to help deliver a best-in-class writing and productivity experience on Apple platforms. You'll own entire features from design handoff through App Store release.",
      requirements: JSON.stringify([
        "3+ years of iOS development with Swift",
        "Solid understanding of UIKit and SwiftUI",
        "Experience shipping apps with millions of active users",
        "Attention to detail on interaction design and animations",
      ]),
      niceToHave: JSON.stringify([
        "Experience with rich text editors or CRDT-based sync",
        "Contributions to open-source Swift projects",
        "Cross-platform mobile experience (RN or Flutter)",
      ]),
    },
    {
      title: "Data Engineer",
      company: "Figma",
      location: "San Francisco, CA",
      salary: "$135k–$170k",
      type: JobType.FULL_TIME,
      status: JobStatus.PAUSED,
      logo: "F",
      tags: "Python,dbt,Spark",
      description:
        "The Data Platform team at Figma is hiring a Data Engineer to help build reliable, scalable pipelines that power product analytics, ML features, and business insights.",
      requirements: JSON.stringify([
        "3+ years of data engineering experience",
        "Proficiency in Python and SQL",
        "Experience with dbt, Airflow, or similar orchestration tools",
        "Strong data modeling skills and a quality-first mindset",
      ]),
      niceToHave: JSON.stringify([
        "Experience with Spark or Flink for large-scale batch processing",
        "Familiarity with Snowflake or BigQuery",
        "Background building data products for ML teams",
      ]),
    },
    {
      title: "Engineering Manager",
      company: "GitHub",
      location: "Remote",
      salary: "$170k–$220k",
      type: JobType.FULL_TIME,
      status: JobStatus.ACTIVE,
      logo: "G",
      tags: "Leadership,TypeScript,Ruby",
      description:
        "GitHub is looking for an Engineering Manager to lead a team of 6–8 engineers working on Copilot's code generation and IDE integrations. You'll balance technical leadership with people management and cross-functional collaboration.",
      requirements: JSON.stringify([
        "5+ years of software engineering, with 2+ years in engineering management",
        "Strong technical foundation — you can read and review code",
        "Track record of growing engineers and building inclusive teams",
        "Excellent stakeholder communication skills",
      ]),
      niceToHave: JSON.stringify([
        "Prior experience with AI/ML product teams",
        "Open-source community involvement",
        "Experience managing remote-first teams across time zones",
      ]),
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: { ...job, authorId: employer.id },
    });
  }

  console.log(`✅ Created ${jobs.length} job listings`);
  console.log("\n🎉 Seed complete!");
  console.log("   Employer login: alice@acme.com");
  console.log("   Jobseeker login: bob@example.com");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
