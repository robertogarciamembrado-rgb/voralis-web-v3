import { getTranslations } from "next-intl/server";
import { IntelligenceDashboard } from "@/components/hero/IntelligenceDashboard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * BLOQUE 01 — HERO
 *
 * Objetivo (brief §6): responder de inmediato qué es VORALIS y qué consigue.
 *
 * Reglas aplicadas:
 * - H1 literal del brief. El énfasis en color de acento cae sobre
 *   "inteligencia para decidir mejor" porque ese es el beneficio.
 * - CERO referencias a TS Orbix: el hero debe funcionar para cualquier
 *   organización que nunca haya oído hablar de la red.
 * - Sin lenguaje de automatización ni recuento de agentes.
 * - Server Component puro: el hero es el LCP y no envía JavaScript.
 *   Tampoco lleva `Reveal` — animar la entrada de lo que ya está en pantalla
 *   solo retrasa la lectura del mensaje principal.
 */
export async function Hero() {
  const t = await getTranslations("Hero");
  const tActions = await getTranslations("Actions");

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line bg-surface"
    >
      {/* Gradiente de malla: profundidad sin competir con el panel */}
      <div
        aria-hidden="true"
        className="glow-brand pointer-events-none absolute -right-40 -top-52 size-[40rem] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-24">
          {/* ---- Columna de mensaje ---------------------------------- */}
          <div>
            <Eyebrow withDot>{t("eyebrow")}</Eyebrow>

            <h1
              id="hero-title"
              tabIndex={-1}
              className="mt-4 max-w-[22ch] text-balance outline-none text-display font-bold text-fg"
            >
              {t("headline.lead")}{" "}
              <span className="text-accent">{t("headline.emphasis")}</span>
            </h1>

            <p className="mt-5 max-w-[38rem] text-pretty text-lg leading-relaxed text-muted sm:text-[1.1875rem]">
              {t("subheadline")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/solicitar-alta" trailingArrow>
                {tActions("requestOnboarding")}
              </Button>
              <Button href="/demo" variant="secondary">
                {tActions("viewDemo")}
              </Button>
            </div>

            <p className="mt-5 text-sm text-muted">{t("note")}</p>
          </div>

          {/* ---- Columna visual -------------------------------------- */}
          <IntelligenceDashboard />
        </div>
      </Container>
    </section>
  );
}
