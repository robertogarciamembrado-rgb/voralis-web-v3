/**
 * Navegación y datos globales del sitio.
 *
 * Fuente: documentacion/Voralis_Textos_Landing_v2.md (secciones «Menú» y «Pie»).
 * Todo el texto trata al visitante de «usted».
 *
 * Botones de acción permitidos en toda la web (solo tres):
 *  - Solicitar alta  → /solicitar-alta
 *  - Ver la demo     → /demo
 *  - Hablar con ventas → /contacto
 */

/** Interruptor de la sección de planes: visible en revisión, apagado en producción. */
export const SHOW_PRICING = process.env.NEXT_PUBLIC_SHOW_PRICING === "true";

export const routes = {
  solicitarAlta: "/solicitar-alta",
  demo: "/demo",
  contacto: "/contacto",
} as const;

export const actions = {
  solicitarAlta: { label: "Solicitar alta", href: routes.solicitarAlta },
  verDemo: { label: "Ver la demo", href: routes.demo },
  hablarVentas: { label: "Hablar con ventas", href: routes.contacto },
} as const;

/* Anclas con «/» inicial para que funcionen también desde las páginas secundarias. */
const navItems = [
  { label: "Qué es Voralis", href: "/#que-es" },
  { label: "Para quién", href: "/#para-quien" },
  { label: "Resultados", href: "/#resultados" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  /* «Planes» solo aparece si el interruptor de precios está activo. */
  ...(SHOW_PRICING ? [{ label: "Planes", href: "/#planes" }] : []),
  { label: "Catálogo", href: "/catalogo" },
] as const;

export const nav = {
  items: navItems,
  cta: actions.solicitarAlta,
} as const;

/** Razón social: pendiente de que la indique administración. */
const legalEntity = "GJC";

export const footer = {
  tagline:
    "Voralis convierte la información de su entorno en inteligencia para decidir mejor.",
  /* Enlaces legales (texto provisional en /legal/* hasta que Diana cierre los textos con eDefense). */
  links: [
    { label: "Aviso legal", href: "/legal/aviso-legal" },
    { label: "Privacidad", href: "/legal/privacidad" },
    { label: "Condiciones", href: "/legal/condiciones" },
    { label: "Uso de IA", href: "/legal/uso-de-ia" },
    { label: "Cookies", href: "/legal/cookies" },
    { label: "Contacto", href: routes.contacto },
  ],
  copyright: `© ${legalEntity} · Voralis es una marca bajo licencia de ${legalEntity}`,
} as const;
