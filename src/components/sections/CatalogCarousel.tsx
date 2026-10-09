"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Network = {
  id: string;
  name: string;
  mark: string;
  color: string;
  report: string;
  status: string;
  available: boolean;
};

const AUTOPLAY_DELAY_MS = 6000;

/**
 * Carrusel de las redes del catálogo para la home.
 *
 * Sustituye a la franja de un solo caso (Cases.tsx) por las tres redes que
 * están en `catalog.networks`. El header estático de la sección (eyebrow,
 * título) sigue siendo server-rendered desde `Cases.tsx`; aquí solo vive el
 * carrusel interactivo, marcado como Client Component por Embla.
 *
 * Decisiones:
 * - Embla (~3 KB) con autoplay, drag, flechas y dots. Loop infinito.
 * - `align: "center"` + `containScroll: "trimSnaps"` para que la tarjeta
 *   activa quede centrada en desktop con peek de la siguiente, y los snaps
 *   en mobile cubran el ancho disponible sin huecos.
 * - Autoplay se detiene en hover, al interactuar y cuando el visitante
 *   tiene `prefers-reduced-motion: reduce`.
 * - Sin CTA por tarjeta: el enlace al catálogo vive en Cases.tsx, debajo
 *   del carrusel, para no canibalizar el tráfico hacia /catalogo.
 * - Los textos traducibles (badges "Disponible" / "Próximamente") vienen
 *   de next-intl. El resto del contenido de cada red (nombre, report,
 *   status) sigue en `pages.ts` hasta fase 2 de i18n.
 *
 * Nota sobre el plugin de autoplay:
 *   El plugin se construye con `useMemo([])` para mantener la misma
 *   referencia entre renders; si se reconstruyera, Embla tendría una
 *   instancia registrada distinta a la del closure y `play()`/`stop()`
 *   lanzarían `Cannot read properties of undefined (reading 'internalEngine')`.
 *   Además, dentro del `useEffect` se accede al plugin vía
 *   `emblaApi.plugins().autoplay` (la instancia que Embla tiene
 *   actualmente registrada) en lugar de por la variable de closure.
 */
export function CatalogCarousel() {
  const t = useTranslations("Catalog");
  const tCommon = useTranslations("Common");

  const networks = t.raw("networks") as Network[];

  // Instancia estable del plugin: misma referencia durante toda la vida del
  // componente. `stopOnInteraction: false` permite que el autoplay se
  // reanude tras un drag o click, salvo que se haya detenido por
  // `prefers-reduced-motion`.
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_DELAY_MS,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: "trimSnaps" },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  /* Estado del carrusel: dots y slide activo. */
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  /* Respeta `prefers-reduced-motion`: detiene el autoplay y desactiva el
     loop interno de Embla para que el visitante controle el ritmo.
     Se accede al plugin vía `emblaApi.plugins().autoplay` para garantizar
     que operamos sobre la instancia que Embla tiene registrada, no sobre
     una referencia obsoleta capturada en el closure. */
  useEffect(() => {
    if (!emblaApi) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const ap = emblaApi.plugins().autoplay;
      if (!ap) return;
      if (media.matches) {
        ap.stop();
        emblaApi.reInit({ loop: false });
      } else {
        emblaApi.reInit({ loop: true });
        ap.play();
      }
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carrusel"
      aria-label={tCommon("carousel.ariaLabel")}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {networks.map((n, i) => (
            <CatalogSlide
              key={n.id}
              network={n}
              availableLabel={tCommon("available")}
              soonLabel={tCommon("soon")}
              slideLabel={tCommon("carousel.slideLabel", {
                index: i + 1,
                total: networks.length,
                name: n.name,
              })}
            />
          ))}
        </div>
      </div>

      <CarouselControls
        scrollSnaps={scrollSnaps}
        selectedIndex={selectedIndex}
        onPrev={scrollPrev}
        onNext={scrollNext}
        onSelect={scrollTo}
        previousLabel={tCommon("carousel.previous")}
        nextLabel={tCommon("carousel.next")}
        selectNetworkLabel={tCommon("carousel.selectNetwork")}
        goToNetworkLabel={(i) => tCommon("carousel.goToNetwork", { index: i })}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Slide individual
   -------------------------------------------------------------------------- */

function CatalogSlide({
  network: n,
  availableLabel,
  soonLabel,
  slideLabel,
}: {
  network: Network;
  availableLabel: string;
  soonLabel: string;
  slideLabel: string;
}) {
  return (
    <div
      className="min-w-0 shrink-0 grow-0 basis-full px-3 sm:basis-[85%] sm:px-4 lg:basis-[52%]"
      aria-roledescription="slide"
      aria-label={slideLabel}
    >
      <article className="card-surface relative flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)]">
        {/* Banda de color: ADN de cada red */}
        <div
          aria-hidden="true"
          className="h-1.5"
          style={{ backgroundColor: n.color }}
        />

        <div className="flex flex-1 flex-col p-7 sm:p-8">
          {/* Cabecera: monograma + estado */}
          <div className="flex items-center justify-between gap-3">
            <span
              className="grid h-12 w-12 place-items-center rounded-xl text-sm font-extrabold tracking-wider text-white"
              style={{ backgroundColor: n.color }}
            >
              {n.mark}
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.625rem] font-extrabold uppercase tracking-wider",
                n.available
                  ? "bg-signal/15 text-signal-deep"
                  : "bg-sunken text-muted",
              )}
            >
              {n.available ? availableLabel : soonLabel}
            </span>
          </div>

          {/* Identidad */}
          <h3 className="mt-6 text-pretty text-xl font-bold tracking-[-0.035em] text-fg sm:text-2xl">
            {n.name}
          </h3>
          <p className="mt-2 text-base font-semibold text-fg-soft">
            {n.report}
          </p>

          {/* Estado / cadencia */}
          <p className="mt-5 text-sm leading-relaxed text-muted">{n.status}</p>
        </div>
      </article>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Controles: flechas + dots
   -------------------------------------------------------------------------- */

function CarouselControls({
  scrollSnaps,
  selectedIndex,
  onPrev,
  onNext,
  onSelect,
  previousLabel,
  nextLabel,
  selectNetworkLabel,
  goToNetworkLabel,
}: {
  scrollSnaps: number[];
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  previousLabel: string;
  nextLabel: string;
  selectNetworkLabel: string;
  goToNetworkLabel: (index: number) => string;
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrev}
        aria-label={previousLabel}
        className="grid size-11 place-items-center rounded-full border border-line bg-raised text-fg transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:border-accent"
      >
        <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2.5} />
      </button>

      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label={selectNetworkLabel}
      >
        {scrollSnaps.map((_, i) => {
          const active = i === selectedIndex;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={goToNetworkLabel(i + 1)}
              onClick={() => onSelect(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 motion-reduce:transition-none",
                active ? "w-8 bg-accent" : "w-2 bg-line hover:bg-fg-soft",
              )}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="grid size-11 place-items-center rounded-full border border-line bg-raised text-fg transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:border-accent"
      >
        <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
