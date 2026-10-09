import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

/**
 * Regla innegociable del brief (§10): "Diferenciar siempre 'Dato real' de
 * 'Estimación'. Nunca presentar una estimación como resultado histórico."
 *
 * Este badge es el mecanismo que hace cumplir esa regla en la interfaz: toda
 * cifra publicada en la web pasa por aquí y declara su naturaleza.
 */
export type DataKind = "real" | "estimate" | "target";

export function DataKindBadge({
  kind,
  tone = "onSurface",
  className,
}: {
  kind: DataKind;
  tone?: "onSurface" | "onPanel";
  className?: string;
}) {
  const t = useTranslations("Common.dataKind");
  const styles =
    tone === "onSurface"
      ? kind === "real"
        ? "badge-real"
        : kind === "estimate"
          ? "badge-estimate"
          : "bg-brand-100 text-brand-700"
      : kind === "real"
        ? "bg-signal/20 text-signal"
        : kind === "estimate"
          ? "bg-white/12 text-brand-200"
          : "bg-brand-100/20 text-brand-100";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.625rem] font-extrabold uppercase tracking-wider",
        styles,
        className,
      )}
    >
      {t(kind)}
    </span>
  );
}
