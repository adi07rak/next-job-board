export default function JobsLoading() {
  return (
    <div className="page-section">
      <div className="container">
        {/* Header skeleton */}
        <div style={{ marginBottom: 32 }}>
          <div className="skeleton" style={{ height: 28, width: 140, marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 16, width: 220 }} />
        </div>

        <div className="two-col">
          {/* Sidebar skeleton */}
          <aside>
            {[1, 2, 3].map((g) => (
              <div key={g} style={{ marginBottom: 28 }}>
                <div className="skeleton" style={{ height: 12, width: 80, marginBottom: 12 }} />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton" style={{ height: 14, width: `${60 + i * 12}%`, marginBottom: 10, borderRadius: 4 }} />
                ))}
              </div>
            ))}
          </aside>

          {/* Cards skeleton */}
          <div className="jobs-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                  <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ height: 16, width: "55%", marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 13, width: "35%" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div className="skeleton" style={{ height: 22, width: 90, borderRadius: 20 }} />
                  <div className="skeleton" style={{ height: 22, width: 70, borderRadius: 20 }} />
                  <div className="skeleton" style={{ height: 22, width: 80, borderRadius: 20 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
