/**
 * /jobs — Job listings page
 *
 * This is a Server Component that fetches directly from the database.
 * No useEffect, no fetch('/api/jobs') — just async/await at the top level.
 *
 * Rendering strategy: ISR (revalidate every 60 seconds)
 */

import Link from "next/link";
import { getAllJobs, parseTags, formatJobType } from "@/lib/jobs";

export const revalidate = 60;

export default async function JobsPage() {
  const jobs = await getAllJobs();

  return (
    <div className="page-section">
      <div className="container">
        <div style={{ marginBottom: 32 }}>
          <h1 className="section-title" style={{ fontSize: 26 }}>
            All jobs
          </h1>
          <p className="section-sub">
            {jobs.length} open roles · updated daily
          </p>
        </div>

        <div className="two-col">
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
          </aside>

          <div className="jobs-grid">
            {jobs.length === 0 && (
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
                No jobs found. Check back soon!
              </p>
            )}
            {jobs.map((job: any) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="job-card">
                <div className="job-card-header">
                  <div className="company-logo">
                    {job.logo ?? job.company[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="job-title">{job.title}</div>
                    <div className="job-company">
                      {job.company} · {job.location}
                    </div>
                  </div>
                  <span className="badge badge-green">
                    {formatJobType(job.type)}
                  </span>
                </div>
                <div className="job-meta">
                  {job.salary && (
                    <span className="badge badge-gray">{job.salary}</span>
                  )}
                  {parseTags(job.tags).map((tag) => (
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
