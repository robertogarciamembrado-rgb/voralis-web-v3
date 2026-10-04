import type { ReactNode } from "react";
import { Container } from "./Container";

/** Cabecera común de las páginas secundarias. */
export function PageHeader({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-sunken py-16 sm:py-20">
      <Container>
        <h1 className="max-w-[26ch] text-balance text-display font-bold text-fg">{title}</h1>
        {lead ? (
          <p className="mt-5 max-w-[41rem] text-pretty text-lg leading-relaxed text-muted">{lead}</p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
