import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = { title: "Soluciones" };

export default function SolutionsPage() {
  const l = solutions.labels;

  return (
    <>
      <PageHeader title={solutions.title} />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5">
          {solutions.items.map((s) => (
            <article
              key={s.slug}
              id={s.slug}
              className="card-surface scroll-mt-28 p-7 sm:p-9"
            >
              <h2 className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-accent">
                {s.name}
              </h2>
              <p className="mt-3 max-w-[40rem] text-pretty text-2xl font-bold tracking-[-0.04em] text-fg">
                {s.headline}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-muted">
                <li>
                  <strong className="font-bold text-fg">{l.watches}:</strong> {s.watches}
                </li>
                <li>
                  <strong className="font-bold text-fg">{l.value}:</strong> {s.value}
                </li>
                {"hiring" in s ? (
                  <li>
                    <strong className="font-bold text-fg">{l.hiring}:</strong> {s.hiring}
                  </li>
                ) : null}
                <li>
                  <strong className="font-bold text-fg">{l.plan}:</strong> {s.plan}
                </li>
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
