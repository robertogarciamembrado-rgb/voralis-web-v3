import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Marca VORALIS. El anillo cónico se hereda de la identidad actual del
 * prototipo; solo cambia el wordmark.
 *
 * El disco interior usa `bg-surface` (no blanco fijo) para que el anillo siga
 * leyéndose como anillo en tema oscuro. En el footer, siempre oscuro, se pasa
 * `tone="onDark"`.
 */
export function Logo({ tone = "auto" }: { tone?: "auto" | "onDark" }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-[-0.03em]"
      aria-label="VORALIS — Inicio"
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative size-7 shrink-0 rounded-full",
          "bg-[conic-gradient(from_220deg,#2ee6ab,#1768ff,#bdd9ff,#2ee6ab)]",
          "after:absolute after:inset-[7px] after:rounded-full",
          tone === "onDark" ? "after:bg-[#08090d]" : "after:bg-surface",
        )}
      />
      <span className={tone === "onDark" ? "text-white" : "text-fg"}>VORALIS</span>
    </Link>
  );
}
