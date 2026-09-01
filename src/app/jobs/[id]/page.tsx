import Link from "next/link";

// Mock data — in Week 2 this will be replaced by a real DB fetch
const jobsData: Record<string, {
  title: string; company: string; location: string;
  salary: string; type: string; posted: string;
  logo: string; tags: string[];
  description: string; requirements: string[]; niceToHave: string[];
}> = {
  "1": {
    title: "Senior Frontend Engineer",
    company: "Vercel",
    location: "Remote (worldwide)",
    salary: "$140k–$180k",
    type: "Full-time",
    posted: "2 days ago",
    logo: "V",
    tags: ["React", "TypeScript", "Next.js"],
    description:
      "We're looking for a Senior Frontend Engineer to help build the next generation of developer tools. You'll work across the Vercel dashboard, CLI, and open-source projects used by millions of developers worldwide.",
    requirements: [
      "5+ years of production React experience",
      "Deep familiarity with TypeScript and modern JavaScript",
      "Experience with performance optimization and Core Web Vitals",
      "Ability to ship independently and collaborate asynchronously",
    ],
    niceToHave: [
      "Contributions to open-source projects",
      "Experience with Rust or WebAssembly",
      "Familiarity with edge computing concepts",
    ],
  },
  "2": {
    title: "Product Designer",
    company: "Linear",
    location: "San Francisco, CA",
    salary: "$120k–$150k",
    type: "Full-time",
    posted: "1 week ago",
    logo: "L",
    tags: ["Figma", "Design systems", "Product thinking"],
    description:
      "Linear is looking for a Product Designer to help shape the future of project management. You'll design features used by thousands of high-performing engineering teams — from early sketches to polished, shipped UI.",
    requirements: [
      "4+ years of product design experience in SaaS",
      "Expert-level Figma skills and a strong portfolio",
      "Ability to think in systems, not just screens",
      "Fluency working with engineers during implementation",
    ],
    niceToHave: [
      "Experience with design tokens and component libraries",
      "Background in developer tooling or B2B software",
      "Some familiarity with CSS/HTML",
    ],
  },
};

// Fallback for job IDs without mock data
const fallbackJob = {
  title: "Engineering Role",
  company: "Top Company",
  location: "Remote",
  salary: "$120k–$160k",
  type: "Full-time",
  posted: "3 days ago",
  logo: "C",
  tags: ["TypeScript", "Node.js"],
  description: "We're hiring talented engineers to join our growing team. You'll work on meaningful problems alongside a world-class team.",
  requirements: ["3+ years professional experience", "Strong communication skills", "Passion for building great products"],
  niceToHave: ["Open-source contributions", "Startup experience"],
};

export default function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = jobsData[params.id] ?? fallbackJob;

  return (
    <div className="page-section">
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: 20, fontSize: 14, color: "var(--text-muted)", display: "flex", gap: 6, alignItems: "center" }}>
          <Link href="/jobs" style={{ color: "var(--text-muted)" }}>Jobs</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>{job.title}</span>
        </div>

        {/* Header card */}
        <div className="detail-header">
          <div className="detail-logo">{job.logo}</div>
          <h1 className="detail-title">{job.title}</h1>
          <p className="detail-company">{job.company} · {job.location}</p>
          <div className="detail-meta">
            <span className="badge badge-green">{job.type}</span>
            <span className="badge badge-gray">{job.salary}</span>
            {job.tags.map((tag) => (
              <span key={tag} className="badge badge-blue">{tag}</span>
            ))}
          </div>
        </div>

        {/* Two-col: description + apply */}
        <div className="detail-two-col">
          {/* Body */}
          <div className="detail-body">
            <h2>About the role</h2>
            <p>{job.description}</p>

            <h2>What you'll need</h2>
            <ul>
              {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <h2>Nice to have</h2>
            <ul>
              {job.niceToHave.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>

          {/* Apply sidebar */}
          <div className="apply-card">
            <div className="apply-card-title">Ready to apply?</div>
            <div className="apply-card-sub">Takes about 5 minutes</div>
            <a href="#" className="apply-btn">Apply now</a>
            <hr className="apply-divider" />
            <div className="apply-detail-row">
              <span className="apply-detail-label">Salary</span>
              <span className="apply-detail-val">{job.salary}</span>
            </div>
            <div className="apply-detail-row">
              <span className="apply-detail-label">Location</span>
              <span className="apply-detail-val">{job.location}</span>
            </div>
            <div className="apply-detail-row">
              <span className="apply-detail-label">Type</span>
              <span className="apply-detail-val">{job.type}</span>
            </div>
            <div className="apply-detail-row">
              <span className="apply-detail-label">Posted</span>
              <span className="apply-detail-val">{job.posted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
