import type { Metadata } from "next";
import Link from "next/link";
import { CatalogCards } from "@/components/sections/CatalogCards";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { catalog } from "@/content/pages";
import { actions } from "@/content/site";

export const metadata: Metadata = { title: "Catálogo de informes" };

export default function CatalogPage() {
  return (
    <>
      <PageHeader title={catalog.title} lead={catalog.lead} />
      <Container className="py-16 sm:py-20">
        <CatalogCards />
        <p className="mt-12 text-lg font-semibold text-fg">
          {catalog.footer}{" "}
          <Link href={actions.solicitarAlta.href} className="text-accent hover:text-accent-hover">
            {actions.solicitarAlta.label}
          </Link>
        </p>
      </Container>
    </>
  );
}
