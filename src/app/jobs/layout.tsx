export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout wraps every page under /jobs — /jobs, /jobs/[id], /jobs/post, etc.
  // Right now it's a transparent pass-through; in Week 3 you'll add auth checks here.
  return <>{children}</>;
}
