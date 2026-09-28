import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Section, SectionHeading, SectionLead } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorks } from "@/content/home";

/**
 * BLOQUE 06 — CÓMO FUNCIONA (brief §12 y §13)
 *
 * Aquí se resuelve la jerarquía de arquitectura, la regla más estricta del
 * brief:
 *
 *   VORALIS ─ plataforma / capa de inteligencia
 *     └─ Vigilante + Pulse ─ MOTORES (dos módulos grandes y simétricos)
 *          └─ Profesor · Congress · Historiador ─ agentes especializados
 *
 * Cómo se hace cumplir visualmente:
 * - Los motores son dos superficies de producto, grandes y del mismo tamaño:
 *   ninguno domina al otro y ambos dominan la sección.
 * - Los agentes especializados van después, en tarjetas claras, más pequeñas
 *   y con tipografía menor. No pueden competir con los motores.
 * - El brief prohíbe llamarlos "dos agentes más": la nomenclatura en pantalla
 *   es "motores de inteligencia".
 */
export function HowItWorks() {
  return (
    <Section id={howItWorks.id} tone="sunken" labelledBy="como-funciona-title">
      <Reveal>
        <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
        <SectionHeading id="como-funciona-title">{howItWorks.headline}</SectionHeading>
        <SectionLead>{howItWorks.lead}</SectionLead>
      </Reveal>

      {/* ---- Los dos motores: peso visual máximo y simétrico --------- */}
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {howItWorks.engines.map((engine, index) => (
          <Reveal key={engine.name} delay={index * 0.1} className="h-full">
            <article className="panel-surface relative h-full overflow-hidden rounded-panel p-8 shadow-panel sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full border border-brand-300/20 shadow-[0_0_0_2.25rem_rgba(161,215,255,0.05)]"
              />

              <div className="relative flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-brand-200">
                  <Icon name={engine.icon as IconName} className="size-5" />
                </span>
                <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-brand-300">
                  Motor de inteligencia
                </p>
              </div>

              <h3 className="relative mt-5 text-3xl font-extrabold tracking-[-0.045em]">
                {engine.name}
              </h3>
              <p className="relative mt-3 text-pretty text-xl font-bold leading-snug tracking-[-0.03em] text-white/95">
                {engine.title}
              </p>
              <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-panel-muted">
                {engine.role}
              </p>

              <ul className="relative mt-7 flex flex-wrap gap-2 border-t border-white/12 pt-6">
                {engine.covers.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/15 bg-white/[0.07] px-2.5 py-1.5 text-xs font-semibold text-brand-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      {/* ---- Cómo operan: señal de confianza, no letra pequeña -------
          No es un bloque nuevo (el brief limita a 7): vive dentro de "Cómo
          funciona" porque describe el modo de operar de los motores. Para una
          plataforma de inteligencia vendida en la UE, esto es argumento
          comercial. */}
      <Reveal>
        <div className="card-surface mt-4 flex flex-col gap-5 p-7 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-signal/12 text-signal-deep">
            <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="text-lg font-bold tracking-[-0.03em] text-fg">
              {howItWorks.compliance.title}
            </h3>
            <p className="mt-2 max-w-[46rem] text-[0.9375rem] leading-relaxed text-muted">
              {howItWorks.compliance.body}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {howItWorks.compliance.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-line bg-sunken px-2.5 py-1.5 text-xs font-semibold text-fg-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* ---- Agentes especializados: deliberadamente secundarios ----- */}
      <div className="mt-14 border-t border-line pt-12">
        <Reveal>
          <Eyebrow>{howItWorks.specialists.eyebrow}</Eyebrow>
          <h3 className="mt-3 max-w-[36rem] text-pretty text-2xl font-bold tracking-[-0.04em] text-fg">
            {howItWorks.specialists.headline}
          </h3>
        </Reveal>

        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {howItWorks.specialists.items.map((agent, index) => (
            <Reveal
              key={agent.name}
              as="li"
              delay={index * 0.07}
              className="card-surface h-full p-5 sm:p-6"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                <Icon name={agent.icon as IconName} className="size-4" />
              </span>
              <h4 className="mt-4 text-base font-bold tracking-[-0.025em] text-fg">{agent.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{agent.body}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted">{agent.use}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Link
            href={howItWorks.specialists.cta.href}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-accent transition-colors duration-300 hover:text-accent-hover"
          >
            {howItWorks.specialists.cta.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              strokeWidth={2.5}
            />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
