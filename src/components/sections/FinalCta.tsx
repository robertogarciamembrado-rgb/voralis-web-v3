import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 7 · LLAMADA FINAL — Solicitar alta · Ver la demo.
 */
export async function FinalCta() {
  const t = await getTranslations("FinalCta");
  const tActions = await getTranslations("Actions");

  return (
    <section
      id="llamada-final"
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
              {t("headline")}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-panel-muted">
              {t("lead")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/solicitar-alta" variant="inverse" trailingArrow>
                {tActions("requestOnboarding")}
              </Button>
              <Button href="/demo" variant="outlineInverse">
                {tActions("viewDemo")}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
