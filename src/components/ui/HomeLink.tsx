"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { scrollBehavior } from "@/lib/scroll";

/** Evento con el que el logotipo pide cerrar el menú móvil (lo escucha MobileNav). */
export const CLOSE_MENU_EVENT = "voralis:close-menu";

/**
 * Enlace «Inicio» de los logotipos de cabecera y pie. Sin JavaScript es un
 * enlace normal a `/`. En la portada evita la navegación, desplaza suavemente
 * (o de golpe con movimiento reducido) hasta el hero y pasa el foco al
 * titular. Desde otra página navega a `/`, que abre arriba, en el hero.
 */
export function HomeLink({ className, children }: { className?: string; children: ReactNode }) {
  const pathname = usePathname();

  function onClick(ev: MouseEvent<HTMLAnchorElement>) {
    window.dispatchEvent(new Event(CLOSE_MENU_EVENT));

    const modified = ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0;
    if (pathname !== "/" || modified) return;

    ev.preventDefault();
    document.getElementById("inicio")?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    document.getElementById("hero-title")?.focus({ preventScroll: true });
  }

  return (
    <Link href="/" onClick={onClick} className={className} aria-label="Voralis — Inicio">
      {children}
    </Link>
  );
}
