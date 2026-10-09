import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 5 · CÓMO FUNCIONA: demo, vídeo y alta
 *
 * Módulo principal (Voralis Vigilante) con vídeo del alta, recorrido en seis
 * pasos, alta en cuatro pasos, garantía y botón «Ver la demo». Debajo, dos
 * módulos menores (Pulse «Próximamente», Congress «Bajo consulta») y la franja
 * de confianza.
 */

type Step = { id: string; title: string; body: string };
type Minor = { id: string; name: string; status: string; body: string; cta: string };

const stepIcons: Record<string, IconName> = {
  fuentes: "globe",
  lectura: "eye",
  radar: "radar",
  borrador: "filetext",
  revision: "usercheck",
  versiones: "languages",
};

const minorIcons: Record<string, IconName> = {
  pulse: "waves",
  congress: "presentation",
};

export async function HowItWorks() {
  const t = await getTranslations("HowItWorks");
  const tActions = await getTranslations("Actions");
  const steps = (await t.raw("steps")) as Step[];
  const onboardingSteps = (await t.raw("onboarding.steps")) as string[];
  const minor = (await t.raw("minor")) as Minor[];
  const trustBody = t("trust.body");
  const trustTags = (await t.raw("trust.tags")) as string[];
  const journeyTitle = t("journeyTitle");
  const onboardingTitle = t("onboardingTitle");
  const videoMarkerNote = t("videoMarkerNote");
  const vigilanteName = t("vigilante");
  const guarantee = t("guarantee");

  return (
    <Section id="como-funciona" tone="sunken" labelledBy="como-funciona-title">
      <Reveal>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <SectionHeading id="como-funciona-title">{t("headline")}</SectionHeading>
      </Reveal>

      {/* ---- Módulo principal ----------------------------------------- */}
      <Reveal>
        <article className="panel-surface relative mt-12 overflow-hidden rounded-panel p-8 shadow-panel sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full border border-brand-300/20 shadow-[0_0_0_2.25rem_rgba(161,215,255,0.05)]"
          />

          <div className="relative flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-brand-200">
              <Icon name="radar" className="size-5" />
            </span>
            <h3 className="text-3xl font-extrabold tracking-[-0.045em]">{vigilanteName}</h3>
          </div>

          {/* Vídeo del alta (90–120 s). Mientras no haya archivo, marcador visible. */}
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border border-white/12 bg-black/30">
            <div className="grid size-full place-items-center px-6 text-center text-sm font-semibold text-panel-muted">
              {videoMarkerNote}
            </div>
          </div>

          <h4 className="relative mt-10 text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-brand-300">
            {journeyTitle}
          </h4>
          <ol className="relative mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className="rounded-xl border border-white/12 bg-white/[0.05] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-brand-200">
                    <Icon
                      name={stepIcons[step.id] ?? "globe"}
                      className="size-4"
                    />
                  </span>
                  <span className="tabular text-[0.8125rem] font-extrabold tracking-[0.08em] text-panel-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-base font-bold tracking-[-0.025em] text-white">
                  {step.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-panel-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <h4 className="relative mt-10 text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-brand-300">
            {onboardingTitle}
          </h4>
          <ol className="relative mt-5 flex flex-col gap-2 text-sm font-semibold text-white/90 md:flex-row md:flex-wrap md:items-center">
            {onboardingSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="hidden text-brand-300 md:inline">
                    →
                  </span>
                ) : null}
                {step}
              </li>
            ))}
          </ol>

          <p className="relative mt-8 rounded-xl border border-signal/30 bg-signal/10 px-5 py-4 text-[0.9375rem] font-bold leading-relaxed text-white">
            {guarantee}
          </p>

          <div className="relative mt-8">
            <Button href="/demo" variant="inverse" trailingArrow>
              {tActions("viewDemo")}
            </Button>
          </div>
        </article>
      </Reveal>

      {/* ---- Módulos menores ------------------------------------------ */}
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {minor.map((module, index) => (
          <Reveal
            key={module.id}
            as="li"
            delay={index * 0.07}
            className="card-surface flex h-full flex-col p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                <Icon
                  name={minorIcons[module.id] ?? "waves"}
                  className="size-4"
                />
              </span>
              <span className="rounded-full border border-line bg-sunken px-2.5 py-1 text-[0.625rem] font-extrabold uppercase tracking-wider text-fg-soft">
                {module.status}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-[-0.03em] text-fg">{module.name}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{module.body}</p>
            <div className="mt-auto pt-6">
              {module.id === "congress" ? (
                <Button href="/contacto?motivo=congress" variant="secondary" size="md">
                  {module.cta}
                </Button>
              ) : (
                <Link
                  href="/contacto?motivo=pulse"
                  className="text-sm font-extrabold text-accent transition-colors duration-300 hover:text-accent-hover"
                >
                  {module.cta} →
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </ul>

      {/* ---- Franja de confianza -------------------------------------- */}
      <Reveal>
        <div className="card-surface mt-4 flex flex-col gap-5 p-7 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-signal/12 text-signal-deep">
            <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="max-w-[46rem] text-[0.9375rem] leading-relaxed text-fg-soft">
              {trustBody}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {trustTags.map((tag) => (
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
    </Section>
  );
}
