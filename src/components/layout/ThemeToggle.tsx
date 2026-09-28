"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "voralis-theme";

/**
 * Conmutador de tema.
 *
 * Claro es el estado por defecto de la marca (brief §18); el oscuro es una
 * elección del visitante, que se recuerda entre visitas.
 *
 * No leemos `prefers-color-scheme`: la identidad clara es el rostro público
 * acordado, y arrancar en oscuro para media internet contradiría esa decisión.
 * El script anti-FOUC de `layout.tsx` aplica el tema guardado antes del primer
 * pintado, así que aquí solo sincronizamos el estado de React.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = document.documentElement.dataset.theme;
    setTheme(stored === "dark" ? "dark" : "light");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Modo privado o almacenamiento bloqueado: el tema dura la sesión. */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      /* Hasta que monta no sabemos el tema real: sin label, el lector de
         pantalla anunciaría una acción equivocada durante un instante. */
      aria-label={
        mounted ? (isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro") : "Cambiar tema"
      }
      aria-pressed={mounted ? isDark : undefined}
      className="grid size-9 place-items-center rounded-xl border border-line text-fg-soft transition-colors duration-300 hover:bg-accent-soft hover:text-accent"
    >
      {/* Ambos iconos montan siempre y se cruzan por opacidad: así el botón no
          cambia de tamaño ni parpadea al conmutar. */}
      <span className="relative block size-[1.05rem]">
        <Sun
          aria-hidden="true"
          strokeWidth={2}
          className={`absolute inset-0 size-full transition-[opacity,transform] duration-300 ${
            isDark ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <Moon
          aria-hidden="true"
          strokeWidth={2}
          className={`absolute inset-0 size-full transition-[opacity,transform] duration-300 ${
            isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
