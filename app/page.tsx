import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-3.5rem)] bg-background">
        <section className="container flex flex-col items-center justify-center gap-6 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            AgencyDocs
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Create proposals and invoices that feel professional, fast to build, and easy to read.
          </p>
        </section>
      </main>
    </>
  );
}
