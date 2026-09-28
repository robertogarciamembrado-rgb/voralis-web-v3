import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Ancho máximo y gutters únicos del sitio. Todo bloque de la home se envuelve
 * aquí para que la rejilla vertical sea consistente.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[71.25rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
