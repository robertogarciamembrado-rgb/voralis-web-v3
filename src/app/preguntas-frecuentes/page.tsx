import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { faq } from "@/content/pages";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

export default function FaqPage() {
  return (
    <>
      <PageHeader title={faq.title} />
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl divide-y divide-line rounded-card border border-line bg-raised">
          {faq.items.map((item) => (
            <details key={item.q} className="group px-6 py-5">
              <summary className="cursor-pointer list-none text-base font-bold text-fg marker:hidden">
                {item.q}
              </summary>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </>
  );
}
