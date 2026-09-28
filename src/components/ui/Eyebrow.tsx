import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Etiqueta superior de sección. El punto verde solo aparece cuando el eyebrow
 * acompaña a un estado "vivo" (hero), no en secciones estáticas.
 */
export function Eyebrow({
  children,
  withDot = false,
  className,
}: {
  children: ReactNode;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-accent",
        className,
      )}
    >
      {withDot ? (
        <span
          aria-hidden="true"
          className="inline-block size-2 shrink-0 rounded-full bg-signal animate-signal-pulse"
        />
      ) : null}
      {children}
    </p>
  );
}
