import { Section, SectionHeading, SectionLead } from "@/components/ui/Section";
import { DataKindBadge } from "@/components/ui/DataKindBadge";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { impact } from "@/content/home";

/**
 * BLOQUE 04 — RESULTADOS + ESTIMACIÓN DE IMPACTO (brief §10)
 *
 * "Esta sección debe ser muy visual. La web tiene que demostrar impacto."
 * Por eso la estimación principal ocupa una superficie de producto propia,
 * con la fórmula visible: la transparencia del cálculo es lo que hace creíble
 * la cifra mientras no exista histórico consolidado.
 */
export function Impact() {
  const e = impact.headlineEstimate;

  return (
    <Section id={impact.id} tone="sunken" labelledBy="resultados-title">
      <Reveal>
        <Eyebrow>{impact.eyebrow}</Eyebrow>
        <SectionHeading id="resultados-title">{impact.headline}</SectionHeading>
        <SectionLead>{impact.lead}</SectionLead>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
        {/* ---- Estimación principal ---------------------------------- */}
        <Reveal>
          <div className="panel-surface relative h-full overflow-hidden rounded-panel p-8 shadow-panel sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -right-24 size-80 rounded-full border border-brand-300/20 shadow-[0_0_0_2.5rem_rgba(161,215,255,0.05)]"
            />
            <DataKindBadge kind={e.kind} tone="onPanel" />

            <p className="relative mt-6 flex flex-wrap items-baseline gap-x-3">
              <span className="tabular text-[clamp(3rem,7vw,4.5rem)] font-extrabold leading-none tracking-[-0.055em]">
                {e.value}
              </span>
              <span className="text-lg font-bold text-panel-muted">{e.unit}</span>
            </p>
            <p className="relative mt-3 max-w-sm text-pretty text-lg font-semibold text-white/90">
              {e.claim}
            </p>

            <div className="relative mt-7 rounded-xl border border-white/12 bg-white/[0.05] p-4">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.09em] text-panel-muted">
                Cómo se calcula
              </p>
              <p className="tabular mt-1.5 text-[0.9375rem] font-semibold text-white/90">
                {e.formula}
              </p>
            </div>

            <p className="relative mt-4 text-xs leading-relaxed text-panel-muted">
              {e.disclaimer}
            </p>
          </div>
        </Reveal>

        {/* ---- Métricas de apoyo ------------------------------------- */}
        <ul className="grid gap-3 sm:grid-cols-2">
          {impact.metrics.map((metric, index) => (
            <Reveal
              key={metric.label}
              as="li"
              delay={Math.min(index, 4) * 0.06}
              className="card-surface flex flex-col p-5 sm:p-6"
            >
              <DataKindBadge kind={metric.kind} className="self-start" />
              <p className="tabular mt-3 text-[1.75rem] font-extrabold leading-none tracking-[-0.045em] text-fg">
                {metric.value}
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-fg-soft">
                {metric.label}
              </p>
              {"period" in metric && metric.period ? (
                <p className="mt-1 text-xs text-muted">{metric.period}</p>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal>
        <p className="mt-8 max-w-[46rem] text-sm leading-relaxed text-muted">{impact.note}</p>
      </Reveal>
    </Section>
  );
}
