import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { capabilities } from "@/content/home";

/**
 * BLOQUE 03 — CAPACIDADES / NECESIDADES DE INTELIGENCIA (brief §9)
 *
 * Bento grid: una tarjeta destacada a doble altura y cuatro normales en
 * rejilla 2×2 a su derecha. La asimetría no es decorativa, jerarquiza. Cinco
 * tarjetas idénticas obligan a leerlas todas para saber cuál importa; el
 * bento dice de un vistazo por dónde empezar, y reputación es la puerta de
 * entrada comercial más frecuente.
 *
 * Recomendación de diseño del brief: primero el beneficio; el motor aparece
 * como pie discreto ("Powered by…"), nunca como titular de la tarjeta.
 */
export function Capabilities() {
  return (
    <Section id={capabilities.id} labelledBy="capacidades-title">
      <Reveal>
        <Eyebrow>{capabilities.eyebrow}</Eyebrow>
        <SectionHeading id="capacidades-title">{capabilities.headline}</SectionHeading>
      </Reveal>

      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.items.map((item, index) => {
          const isFeature = item.span === "feature";

          return (
            <Reveal
              key={item.title}
              as="li"
              delay={Math.min(index, 3) * 0.07}
              className={cn(
                "card-surface flex h-full flex-col p-7 sm:p-8",
                /* La destacada ocupa dos filas y recibe el trazo animado: es
                   el único punto de la sección donde queremos que caiga la
                   mirada primero. */
                isFeature && "border-beam lg:row-span-2",
              )}
            >
              <span
                className={cn(
                  "grid place-items-center rounded-xl",
                  isFeature ? "size-12 bg-accent text-white" : "size-10 bg-accent-soft text-accent",
                )}
              >
                <Icon
                  name={item.icon as IconName}
                  className={isFeature ? "size-[1.35rem]" : "size-[1.15rem]"}
                />
              </span>

              <h3
                className={cn(
                  "mt-5 font-bold tracking-[-0.03em] text-fg",
                  isFeature ? "text-2xl" : "text-xl",
                )}
              >
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>

              <p className="mt-5 text-[0.9375rem] font-bold leading-snug text-fg">{item.result}</p>

              {/* Desglose exclusivo de la destacada: es lo que justifica su
                  doble altura en el bento en lugar de dejar un hueco. */}
              {"highlights" in item ? (
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-[0.2rem] size-4 shrink-0 text-accent"
                        strokeWidth={2.75}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Pie discreto: conecta capacidad y producto sin protagonismo */}
              <p className="mt-auto pt-6 text-[0.6875rem] font-bold uppercase tracking-[0.09em] text-muted">
                Powered by {item.poweredBy}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
