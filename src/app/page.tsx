import Link from "next/link";

const featuredJobs = [
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
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="hero-label">
            <span className="hero-dot" />
            2,400 new jobs this week
          </p>
          <h1 className="hero-title">
            Find work that
            <br />
            fits your life.
          </h1>
          <p className="hero-sub">
            Curated engineering, design, and product roles at companies that
            care about craft.
          </p>
          <div className="hero-actions">
            <Link href="/jobs" className="btn-primary">
              Browse all jobs
            </Link>
            <Link href="/dashboard" className="btn-secondary">
              Post a job
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-value">12,400</div>
              <div className="stat-label">Active listings</div>
            </div>
            <div>
              <div className="stat-value">3,800</div>
              <div className="stat-label">Companies hiring</div>
            </div>
            <div>
              <div className="stat-value">94%</div>
              <div className="stat-label">Remote-friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 20,
            }}
          >
            <div>
              <h2 className="section-title">Featured roles</h2>
              <p className="section-sub">
                Hand-picked for quality and culture fit
              </p>
            </div>
            <Link href="/jobs" className="nav-link" style={{ fontSize: 14 }}>
              View all →
            </Link>
          </div>

          <div className="jobs-grid">
            {featuredJobs.map((job) => (
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
      </section>
    </>
  );
}
