import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/content/home";

/**
 * BLOQUE 07 — CTA FINAL (brief §15)
 * Cierra pidiendo el problema del visitante, no una demo de producto.
 */
export function FinalCta() {
  return (
    <section
      id={finalCta.id}
      aria-labelledby="cta-title"
      className="panel-surface relative overflow-hidden py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 size-[32rem] -translate-y-1/2 rounded-full border border-brand-300/15 shadow-[0_0_0_3rem_rgba(161,215,255,0.04)]"
      />

      <Container className="relative">
        <Reveal>
          <div className="max-w-[38rem]">
            <h2 id="cta-title" className="text-balance text-title font-bold text-white">
              {finalCta.headline}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-panel-muted">
              {finalCta.lead}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={finalCta.primaryCta.href} variant="inverse" trailingArrow>
                {finalCta.primaryCta.label}
              </Button>
              <Button href={finalCta.secondaryCta.href} variant="outlineInverse">
                {finalCta.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
