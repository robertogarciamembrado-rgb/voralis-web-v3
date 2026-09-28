import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DataKindBadge } from "@/components/ui/DataKindBadge";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/content/home";

/**
 * BLOQUE 05 — VORALIS EN ACCIÓN (brief §11)
 *
 * Formato compacto exigido por el brief: reto + solución + tres métricas + CTA.
 * El detalle largo vive en las páginas de caso, no en la home.
 */
export function Cases() {
  return (
    <Section id={cases.id} labelledBy="casos-title">
      <Reveal>
        <Eyebrow>{cases.eyebrow}</Eyebrow>
        <SectionHeading id="casos-title">{cases.headline}</SectionHeading>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {cases.items.map((item, index) => (
          <Reveal key={item.client} delay={index * 0.1} className="h-full">
            <article className="card-surface flex h-full flex-col rounded-[var(--radius-panel)] p-7 sm:p-9">
              <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-accent">
                {item.client}
              </p>
              <h3 className="mt-3 text-pretty text-2xl font-bold tracking-[-0.04em] text-fg">
                {item.title}
              </h3>

              {/* El bloque descriptivo crece para que métricas y CTA queden
                  alineados a la misma altura en ambas tarjetas. */}
              <dl className="mt-6 flex flex-1 flex-col gap-4 border-t border-line pt-6">
                <div>
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.09em] text-muted">
                    El reto
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                    {item.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.09em] text-muted">
                    Con VORALIS
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                    {item.solution}
                  </dd>
                </div>
              </dl>

              <ul className="mt-6 grid grid-cols-1 gap-3 rounded-[var(--radius-card)] bg-sunken p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
                {item.metrics.map((metric) => (
                  <li
                    key={metric.label}
                    className="flex flex-col border-b border-line pb-3 last:border-0 last:pb-0 sm:border-0 sm:pb-0"
                  >
                    <p className="tabular text-lg font-extrabold leading-tight tracking-[-0.035em] text-fg">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[0.6875rem] leading-snug text-muted">{metric.label}</p>
                    {/* El badge se ancla abajo para que los tres queden en
                        línea aunque un valor ocupe dos líneas. */}
                    <DataKindBadge kind={metric.kind} className="mt-auto self-start pt-2" />
                  </li>
                ))}
              </ul>

              <Link
                href={item.cta.href}
                className="group mt-6 inline-flex items-center gap-2 self-start text-[0.9375rem] font-extrabold text-accent transition-colors duration-300 hover:text-accent-hover"
              >
                {item.cta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  strokeWidth={2.5}
                />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 max-w-[46rem] text-sm leading-relaxed text-muted">{cases.disclaimer}</p>
      </Reveal>
    </Section>
  );
}
