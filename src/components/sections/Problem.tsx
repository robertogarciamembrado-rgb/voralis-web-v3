import { Section, SectionHeading, SectionLead } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/content/home";

/**
 * BLOQUE 02 — EL PROBLEMA + PROPUESTA DE VALOR (brief §8)
 * Conectar → Entender → Anticipar. Tres ideas, sin tecnicismos.
 */
export function Problem() {
  return (
    <Section id={problem.id} tone="sunken" labelledBy="problema-title">
      <Reveal>
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <SectionHeading id="problema-title">{problem.headline}</SectionHeading>
        <SectionLead>{problem.lead}</SectionLead>
      </Reveal>

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {problem.pillars.map((pillar, index) => (
          <Reveal
            key={pillar.index}
            as="li"
            delay={index * 0.08}
            className="card-surface h-full p-7 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon name={pillar.icon as IconName} className="size-[1.15rem]" />
              </span>
              <span className="tabular text-[0.8125rem] font-extrabold tracking-[0.08em] text-muted">
                {pillar.index}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-fg">{pillar.title}</h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
