"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Entrada al scroll.
 *
 * Es la única isla de cliente que envuelve contenido de las secciones: en
 * lugar de convertir cada bloque en Client Component, se envuelve el contenido
 * ya renderizado en servidor y se pasa como `children`. React sigue enviando
 * el HTML de las secciones desde el servidor; solo el wrapper lleva JS.
 *
 * `as` existe por corrección de HTML, no por conveniencia: dentro de un `<ul>`
 * el hijo debe ser un `<li>`, y un `<div>` intermedio invalida el marcado y
 * rompe el anuncio de "lista de N elementos" en los lectores de pantalla.
 *
 * `once` dispara una sola vez: una landing que reanima al volver a subir se
 * siente inquieta, no viva.
 *
 * ─── Hidratación ──────────────────────────────────────────────────────────
 * `useReducedMotion()` de framer-motion 13 devuelve `null` en el servidor,
 * pero en el cliente puede devolver `true` o `false` durante la hidratación
 * (la consulta a `matchMedia` es síncrona). Si renderizáramos un `<div>`
 * plano en el cliente y un `motion.div` con `data-reveal=""` y estilos
 * inline en el servidor, React detecta el desajuste y avisa en consola.
 *
 * Para que el primer render del cliente coincida con el del servidor,
 * gating la decisión de saltar la animación con un `mounted` que solo se
 * vuelve `true` tras el primer `useEffect`. Hasta entonces siempre se
 * renderiza el componente de motion, igual que en SSR.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const Tag = as === "li" ? motion.li : motion.div;

  // Tras montar: si el usuario tiene `prefers-reduced-motion: reduce`,
  // renderizamos el elemento plano para evitar la animación.
  if (mounted && reduceMotion === true) {
    return as === "li" ? (
      <li className={className}>{children}</li>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  return (
    <Tag
      /* Gancho para el `<noscript>` de `layout.tsx`: Motion serializa
         `initial` como estilo inline en el HTML del servidor, así que sin
         JavaScript este contenido quedaría en opacidad 0 — invisible para
         quien lo desactive y para cualquier rastreador que no ejecute JS. */
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* `amount` (fracción visible) en lugar de `margin` negativo: dispara de
         forma más fiable en secciones altas, donde un margen fijo puede
         quedarse esperando a que entre un bloque que ya se está leyendo. */
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
