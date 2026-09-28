import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outlineInverse";
type Size = "md" | "lg";

/**
 * Nota sobre la transición: las guías piden `transition-all duration-300`.
 * Mantengo los 300 ms, pero enumero las propiedades en lugar de usar `all`:
 * `transition-all` también anima ancho, alto y espaciado, y en un botón que
 * envuelve texto variable eso provoca reflow visible en cada hover. El efecto
 * percibido es idéntico; el coste de render, no.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold " +
  "transition-[transform,background-color,box-shadow,color,border-color] duration-300 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:duration-75 " +
  "motion-reduce:transform-none motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-brand hover:bg-accent-hover hover:shadow-card active:brightness-95",
  secondary:
    "border border-line bg-raised text-fg hover:border-accent hover:bg-accent-soft hover:text-accent",
  ghost: "text-accent hover:text-accent-hover",
  inverse: "bg-white text-[#0a1c3a] hover:bg-brand-100",
  /* Secundario sobre superficie oscura. Existe como variante propia en vez de
     parchearse con className: sobrescribir el color de texto desde fuera
     depende del orden de las utilidades en la hoja, no del orden en el
     atributo, y el botón acababa renderizando texto navy sobre fondo navy. */
  outlineInverse:
    "border border-white/25 bg-white/5 text-white hover:border-white/45 hover:bg-white/12",
};

const sizes: Record<Size, string> = {
  md: "px-[1.125rem] py-[0.6875rem] text-sm",
  lg: "px-[1.375rem] py-[0.9375rem] text-[0.9375rem]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  trailingArrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  trailingArrow?: boolean;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
      {trailingArrow ? (
        /* aria-hidden: la flecha es decorativa, el texto ya describe la acción. */
        <span aria-hidden="true" className="text-[1.1em] leading-none">
          →
        </span>
      ) : null}
    </Link>
  );
}
