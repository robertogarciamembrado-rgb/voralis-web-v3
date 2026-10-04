import type { Metadata } from "next";
import Link from "next/link";
import { IntelligenceDashboard } from "@/components/hero/IntelligenceDashboard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { demo } from "@/content/pages";
import { actions } from "@/content/site";

export const metadata: Metadata = { title: "Ver la demo" };

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="mt-12">
      <h2 className="text-xl font-bold tracking-[-0.03em] text-fg">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Pending() {
  return (
    <div className="grid min-h-40 place-items-center rounded-card border border-dashed border-line bg-sunken px-6 text-center text-sm font-semibold text-muted">
      {demo.pending}
    </div>
  );
}

export default function DemoPage() {
  return (
    <>
      <PageHeader title={demo.title} lead={demo.lead}>
        {/* Etiqueta fija: toda la demo es una edición de ejemplo. */}
        <p className="mt-6 inline-flex rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-signal-deep">
          {demo.label}
        </p>
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <Block title={demo.blocks.radar}>
          <div className="max-w-3xl">
            <IntelligenceDashboard />
          </div>
        </Block>
        <Block title={demo.blocks.news}>
          <Pending />
        </Block>
        <Block title={demo.blocks.thumbnails}>
          <Pending />
        </Block>
        <Block title={demo.blocks.video}>
          <Pending />
        </Block>

        <p className="mt-12 max-w-[46rem] text-sm leading-relaxed text-muted">{demo.aiNote}</p>

        <p className="mt-10 text-lg font-semibold text-fg">
          {demo.closing}{" "}
          <Link href={actions.solicitarAlta.href} className="text-accent hover:text-accent-hover">
            {actions.solicitarAlta.label}
          </Link>
        </p>
      </Container>
    </>
  );
}
