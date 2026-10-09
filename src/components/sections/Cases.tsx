import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CatalogCarousel } from "./CatalogCarousel";

/**
 * Casos (parte de la sección 4): carrusel de las redes del catálogo.
 *
 * El CTA único de la sección apunta a /catalogo: las tarjetas del carrusel
 * no llevan su propio botón a propósito, para concentrar el tráfico en la
 * página que muestra el catálogo completo con detalle por red.
 */
export async function Cases() {
  const t = await getTranslations("Cases");
  const tCommon = await getTranslations("Common");

  return (
    <section
      id="casos"
      aria-labelledby="casos-title"
      className="border-t border-line bg-surface py-16 sm:py-20"
    >
      <Container>
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-accent">
              {t("eyebrow")}
            </p>
            <h2
              id="casos-title"
              className="mt-3 text-pretty text-title font-bold tracking-[-0.04em] text-fg"
            >
              {t("headline")}
            </h2>
            <p className="mx-auto mt-4 max-w-[42rem] text-pretty text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              {t("lead")}
            </p>
          </header>
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <CatalogCarousel />
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <Button href="/catalogo" trailingArrow>
            {tCommon("viewCatalog")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
