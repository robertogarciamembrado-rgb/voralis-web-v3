import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/content/home";

/**
 * Caso (parte de la sección 4): Tourism & Society Think Tank.
 * Franja compacta bajo las métricas; el detalle vive en /catalogo.
 */
export function Cases() {
  return (
    <section
      id={cases.id}
      aria-labelledby="casos-title"
      className="border-t border-line bg-surface py-16 sm:py-20"
    >
      <Container>
        <Reveal>
          <article className="card-surface rounded-[var(--radius-panel)] p-7 sm:p-9">
            <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-accent">
              Caso
            </p>
            <h3
              id="casos-title"
              className="mt-3 text-pretty text-2xl font-bold tracking-[-0.04em] text-fg"
            >
              {cases.client}
            </h3>
            <p className="mt-4 max-w-[46rem] text-pretty text-[0.9375rem] leading-relaxed text-muted">
              {cases.body}
            </p>
            <Link
              href={cases.cta.href}
              className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-extrabold text-accent transition-colors duration-300 hover:text-accent-hover"
            >
              {cases.cta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                strokeWidth={2.5}
              />
            </Link>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
