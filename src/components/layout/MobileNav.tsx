"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { CLOSE_MENU_EVENT } from "@/components/ui/HomeLink";
import { nav } from "@/content/site";

/**
 * Isla de cliente del header. El resto de la navegación es Server Component:
 * mantener el `use client` en la hoja evita arrastrar el layout entero al
 * bundle del navegador.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  /* Los logotipos de cabecera y pie cierran el menú al pulsarse. */
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener(CLOSE_MENU_EVENT, close);
    return () => window.removeEventListener(CLOSE_MENU_EVENT, close);
  }, []);

  /* Bloquea el scroll de fondo y permite cerrar con Escape. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="grid size-9 place-items-center rounded-xl border border-line text-fg-soft transition-colors duration-300 hover:bg-accent-soft hover:text-accent"
      >
        {open ? (
          <X aria-hidden="true" className="size-[1.05rem]" strokeWidth={2} />
        ) : (
          <Menu aria-hidden="true" className="size-[1.05rem]" strokeWidth={2} />
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full mt-2 origin-top animate-rise rounded-card border border-line bg-raised p-3 shadow-panel"
        >
          <nav aria-label="Navegación principal (móvil)">
            <ul className="flex flex-col">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[0.9375rem] font-semibold text-fg-soft transition-colors duration-300 hover:bg-accent-soft hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-extrabold text-white"
          >
            {nav.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
