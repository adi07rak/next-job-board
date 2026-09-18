/**
 * /jobs/[id] — Job detail page
 *
 * Rendering: SSR (cache: 'no-store') so view counts and status changes
 * are always fresh. generateMetadata gives each job its own SEO title.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getJobById,
  parseTags,
  parseList,
  formatJobType,
  incrementJobViews,
} from "@/lib/jobs";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);
  if (!job) return { title: "Job not found" };
  return {
    title: `${job.title} at ${job.company} — JobBoard`,
    description: job.description.slice(0, 155),
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobById(params.id);

  if (!job) notFound();

  // Fire-and-forget view count increment (don't await — keep page fast)
  incrementJobViews(params.id);

  const requirements = parseList(job.requirements);
  const niceToHave = parseList(job.niceToHave);
  const tags = parseTags(job.tags);
  const typeLabel = formatJobType(job.type);

  return (
    <div className="page-section">
      <div className="container">
        {/* Breadcrumb */}
        <div
          style={{
            marginBottom: 20,
            fontSize: 14,
            color: "var(--text-muted)",
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          <Link href="/jobs" style={{ color: "var(--text-muted)" }}>
            Jobs
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>{job.title}</span>
        </div>

        {/* Header card */}
        <div className="detail-header">
          <div className="detail-logo">{job.logo ?? job.company[0]}</div>
          <h1 className="detail-title">{job.title}</h1>
          <p className="detail-company">
            {job.company} · {job.location}
          </p>
          <div className="detail-meta">
            <span className="badge badge-green">{typeLabel}</span>
            {job.salary && (
              <span className="badge badge-gray">{job.salary}</span>
            )}
            {tags.map((tag) => (
              <span key={tag} className="badge badge-blue">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-two-col">
          {/* Body */}
          <div className="detail-body">
            <h2>About the role</h2>
            <p>{job.description}</p>

            {requirements.length > 0 && (
              <>
                <h2>What you'll need</h2>
                <ul>
                  {requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            {niceToHave.length > 0 && (
              <>
                <h2>Nice to have</h2>
                <ul>
                  {niceToHave.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Apply sidebar */}
          <div className="apply-card">
            <div className="apply-card-title">Ready to apply?</div>
            <div className="apply-card-sub">Takes about 5 minutes</div>
            <a href="#" className="apply-btn">
              Apply now
            </a>
            <hr className="apply-divider" />
            {job.salary && (
              <div className="apply-detail-row">
                <span className="apply-detail-label">Salary</span>
                <span className="apply-detail-val">{job.salary}</span>
              </div>
            )}
            <div className="apply-detail-row">
              <span className="apply-detail-label">Location</span>
              <span className="apply-detail-val">{job.location}</span>
            </div>
            <div className="apply-detail-row">
              <span className="apply-detail-label">Type</span>
              <span className="apply-detail-val">{typeLabel}</span>
            </div>
            <div className="apply-detail-row">
              <span className="apply-detail-label">Views</span>
              <span className="apply-detail-val">
                {job.views.toLocaleString()}
              </span>
            </div>
            <div className="apply-detail-row">
              <span className="apply-detail-label">Posted by</span>
              <span className="apply-detail-val">
                {job.author.name ?? job.author.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
