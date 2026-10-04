/** Utilidades de desplazamiento que respetan `prefers-reduced-motion`. */

export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/**
 * Muestra una confirmación recién renderizada: desplaza la vista hasta su
 * contenedor (con `scroll-margin-top` para la cabecera fija) y mueve el foco
 * al título para que un lector de pantalla lo anuncie.
 */
export function revealConfirmation(container: HTMLElement | null, title: HTMLElement | null) {
  container?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  title?.focus({ preventScroll: true });
}
