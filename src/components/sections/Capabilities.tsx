import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { capabilities } from "@/content/home";

/**
 * 3 · PARA QUÉ Y PARA QUIÉN
 *
 * Cinco tarjetas: la primera (Inteligencia de mercado) es la destacada y ocupa
 * dos columnas; la última (Reputación) va atenuada porque depende de Voralis
 * Pulse, que llega próximamente. Debajo, la fila «Para quién»: cada etiqueta
 * enlaza a su bloque en /soluciones.
 */
export function Capabilities() {
  const { audience } = capabilities;

  return (
    <Section id={capabilities.id} labelledBy="capacidades-title">
      <Reveal>
        <Eyebrow>{capabilities.eyebrow}</Eyebrow>
        <SectionHeading id="capacidades-title">{capabilities.headline}</SectionHeading>
      </Reveal>

      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.items.map((item, index) => {
          const isFeature = item.span === "feature";
          const isMuted = item.span === "muted";

          return (
            <Reveal
              key={item.title}
              as="li"
              delay={Math.min(index, 3) * 0.07}
              className={cn(
                "card-surface flex h-full flex-col p-7 sm:p-8",
                isFeature && "border-beam md:col-span-2",
                isMuted && "opacity-60",
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

              <p className="mt-auto pt-6 text-[0.6875rem] font-bold uppercase tracking-[0.09em] text-muted">
                {"footer" in item ? item.footer : item.badge}
              </p>
            </Reveal>
          );
        })}
      </ul>

      {/* ---- Fila «Para quién» ---------------------------------------- */}
      <Reveal>
        <div className="mt-14 border-t border-line pt-10">
          <h3 className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-accent">
            {audience.title}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {audience.items.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/soluciones#${entry.slug}`}
                  className="inline-flex rounded-full border border-line bg-raised px-4 py-2 text-sm font-semibold text-fg-soft transition-colors duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent"
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[46rem] text-pretty text-[0.9375rem] leading-relaxed text-muted">
            {audience.line}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
