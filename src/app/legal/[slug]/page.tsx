import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { legalPages, legalPlaceholder, type LegalSlug } from "@/content/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: legalPages[slug as LegalSlug] };
}

/** Páginas legales con texto provisional hasta que Diana cierre los textos con eDefense. */
export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = legalPages[slug as LegalSlug];
  if (!title) notFound();

  return (
    <>
      <PageHeader title={title} />
      <Container className="py-16 sm:py-20">
        <p className="max-w-[41rem] text-[0.9375rem] leading-relaxed text-muted">{legalPlaceholder}</p>
      </Container>
    </>
  );
}
