import Link from "next/link";

const jobs = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    location: "Remote",
    salary: "$140k–$180k",
    type: "Part-time",
    tags: ["React", "TypeScript"],
    logo: "V",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Linear",
    location: "San Francisco",
    salary: "$120k–$150k",
    type: "Full-time",
    tags: ["Figma", "Design systems"],
    logo: "L",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Planetscale",
    location: "Remote",
    salary: "$130k–$160k",
    type: "Full-time",
    tags: ["Go", "MySQL"],
    logo: "P",
  },
  {
    id: "4",
    title: "Staff Engineer",
    company: "Stripe",
    location: "New York",
    salary: "$180k–$240k",
    type: "Full-time",
    tags: ["Distributed systems"],
    logo: "S",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Fly.io",
    location: "Remote",
    salary: "$120k–$155k",
    type: "Full-time",
    tags: ["Kubernetes", "Rust"],
    logo: "F",
  },
  {
    id: "6",
    title: "iOS Engineer",
    company: "Notion",
    location: "Remote",
    salary: "$130k–$165k",
    type: "Full-time",
    tags: ["Swift", "SwiftUI"],
    logo: "N",
  },
  {
    id: "7",
    title: "Data Engineer",
    company: "Figma",
    location: "San Francisco",
    salary: "$135k–$170k",
    type: "Full-time",
    tags: ["Python", "dbt"],
    logo: "F",
  },
  {
    id: "8",
    title: "Engineering Manager",
    company: "GitHub",
    location: "Remote",
    salary: "$170k–$220k",
    type: "Full-time",
    tags: ["Leadership", "TypeScript"],
    logo: "G",
  },
];

export default function JobsPage() {
  return (
    <div className="page-section">
      <div className="container">
        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1 className="section-title" style={{ fontSize: 26 }}>
            All jobs
          </h1>
          <p className="section-sub">
            {jobs.length} open roles · updated daily
          </p>
        </div>

        <div className="two-col">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="filter-group">
              <div className="filter-label">Job type</div>
              <div className="filter-options">
                {["Full-time", "Part-time", "Contract", "Internship"].map(
                  (t) => (
                    <div
                      key={t}
                      className={`filter-option ${t === "Full-time" ? "active" : ""}`}
                    >
                      <div className="filter-check" />
                      {t}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-label">Location</div>
              <div className="filter-options">
                {["Remote", "San Francisco", "New York", "London"].map((l) => (
                  <div key={l} className="filter-option">
                    <div className="filter-check" />
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-label">Experience</div>
              <div className="filter-options">
                {[
                  "Junior (0–2 yrs)",
                  "Mid (3–5 yrs)",
                  "Senior (5+ yrs)",
                  "Staff / Principal",
                ].map((e) => (
                  <div key={e} className="filter-option">
                    <div className="filter-check" />
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Job list */}
          <div className="jobs-grid">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="job-card">
                <div className="job-card-header">
                  <div className="company-logo">{job.logo}</div>
                  <div style={{ flex: 1 }}>
                    <div className="job-title">{job.title}</div>
                    <div className="job-company">
                      {job.company} · {job.location}
                    </div>
                  </div>
                  <span className="badge badge-green">{job.type}</span>
                </div>
                <div className="job-meta">
                  <span className="badge badge-gray">{job.salary}</span>
                  {job.tags.map((tag) => (
                    <span key={tag} className="badge badge-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
