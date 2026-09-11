import Link from "next/link";

const postedJobs = [
  { id: "1", title: "Senior Frontend Engineer", applicants: 48, views: 1240, status: "active",   posted: "Mar 12, 2025" },
  { id: "2", title: "Product Designer",          applicants: 31, views:  892, status: "active",   posted: "Mar 8, 2025"  },
  { id: "3", title: "Backend Engineer",          applicants: 12, views:  430, status: "paused",   posted: "Feb 28, 2025" },
  { id: "4", title: "DevOps Engineer",           applicants:  5, views:  220, status: "draft",    posted: "Mar 15, 2025" },
];

const statusBadge: Record<string, string> = {
  active: "badge-green",
  paused: "badge-amber",
  draft:  "badge-gray",
};

export default function DashboardPage() {
  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 className="dashboard-title">Employer dashboard</h1>
            <p className="dashboard-sub">Manage your job listings and review applicants</p>
          </div>
          <Link href="/jobs/post" className="btn-primary">+ Post a new job</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card-label">Total applicants</div>
          <div className="stat-card-value">96</div>
          <div className="stat-card-change">↑ 18% this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active listings</div>
          <div className="stat-card-value">2</div>
          <div className="stat-card-change">of 4 total</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total views</div>
          <div className="stat-card-value">2,782</div>
          <div className="stat-card-change">↑ 5% vs last week</div>
        </div>
      </div>

      {/* Posted jobs table */}
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2 className="section-title">Your listings</h2>
      </div>

      <div className="posted-jobs-list">
        {postedJobs.map((job) => (
          <div key={job.id} className="posted-job-row">
            <div className="posted-job-info">
              <div className="posted-job-title">{job.title}</div>
              <div className="posted-job-meta">Posted {job.posted} · {job.views.toLocaleString()} views · {job.applicants} applicants</div>
            </div>
            <span className={`badge ${statusBadge[job.status]}`}>{job.status}</span>
            <div className="posted-job-actions">
              <Link href={`/jobs/${job.id}`} className="btn-secondary" style={{ fontSize: 13, padding: "5px 12px" }}>
                View
              </Link>
              <button className="btn-secondary" style={{ fontSize: 13, padding: "5px 12px", cursor: "pointer", border: "1px solid var(--border-strong)", background: "var(--surface)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)" }}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
