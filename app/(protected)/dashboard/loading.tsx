export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 px-4 py-12 md:px-6">
        <div className="space-y-2">
          <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </section>
    </main>
  );
}
