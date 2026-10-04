import { cn } from "@/lib/cn";
import { HomeLink } from "./HomeLink";
import horizontalLogo from "@/content/Logotipo-horizontal-Voralis-en-fondo-transparente.svg";
import isotypeLogo from "@/content/Isotipo-Voralis-en-fondo-transparente.svg";
import isoHorizontalLogo from "@/content/ISOLogotipo-Voralis-horizontal.svg";

type LogoProps = {
  /** auto → text-fg (adapta al tema). onDark → accent verde sobre oscuro (header).
   *  onDarkWhite → blanco sobre oscuro (footer). */
  tone?: "auto" | "onDark" | "onDarkWhite";
  /**
   * horizontal     → logotipo en línea (header).
   * stacked        → solo el isotipo cuadrado (fallback; sin uso actual).
   * isoHorizontal  → ISOLogotipo horizontal: isotipo + wordmark, ratio 2:1 (footer).
   */
  variant?: "horizontal" | "stacked" | "isoHorizontal";
  /** Anula el ancho por defecto. Útil para el footer, que necesita más espacio. */
  className?: string;
};

export function Logo({ tone = "auto", variant = "horizontal", className }: LogoProps) {
  const source =
    variant === "horizontal"
      ? horizontalLogo
      : variant === "isoHorizontal"
        ? isoHorizontalLogo
        : isotypeLogo;

  const colorClass =
    tone === "onDark" ? "text-signal" : tone === "onDarkWhite" ? "text-white" : "text-fg";

  const sizeClass =
    variant === "horizontal"
      ? "aspect-[16/3] w-32 sm:w-36"
      : variant === "isoHorizontal"
        ? "aspect-[2/1] w-40 sm:w-48" /* 1774:887 ≈ 2:1 */
        : "aspect-square w-12 sm:w-14";

  return (
    <HomeLink className={cn("inline-flex shrink-0 items-center", className)}>
      <span
        aria-hidden="true"
        className={cn("block bg-current", sizeClass, colorClass)}
        style={{
          maskImage: `url("${source.src}")`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
          WebkitMaskImage: `url("${source.src}")`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
        }}
      />
    </HomeLink>
  );
}
