import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Envoltorio de bloque. Unifica el ritmo vertical y las variantes de fondo
 * para que la home mantenga la alternancia sin que cada sección invente su
 * propio espaciado.
 */
export function Section({
  id,
  children,
  tone = "surface",
  className,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  tone?: "surface" | "sunken";
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        tone === "sunken" ? "bg-sunken" : "bg-surface",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn("mt-3.5 max-w-[42rem] text-balance text-title font-bold text-fg", className)}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-4 max-w-[41rem] text-pretty text-lg leading-relaxed text-muted", className)}>
      {children}
    </p>
  );
}
