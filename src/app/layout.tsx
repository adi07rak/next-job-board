import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Hunt — Find your next role",
  description: "Browse thousands of engineering, design, and product jobs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="logo">
              <span className="logo-mark">JH</span>
              Job Hunt
            </Link>
            <nav className="nav-links">
              <Link href="/jobs" className="nav-link">
                Browse jobs
              </Link>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link href="/jobs/post" className="btn-primary">
                Post a job
              </Link>
            </nav>
          </div>
        </header>

        <main className="main-content">{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <span className="footer-brand">Job Hunt</span>
            <span className="footer-copy">© 2026 · Built with Next.js</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
