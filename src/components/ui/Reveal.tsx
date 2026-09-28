"use client";

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
  const reduceMotion = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  if (reduceMotion) {
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
