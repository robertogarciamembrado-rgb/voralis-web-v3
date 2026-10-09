/**
 * Datos globales del sitio que NO son traducibles.
 *
 * El copy traducible (botones, nav, footer, CTAs, forms, etc.) vive en
 * `messages/{locale}.json` y se consume vía `getTranslations` /
 * `useTranslations` de next-intl. Aquí solo quedan:
 *  - `SHOW_PRICING`: interruptor de la sección de planes (build-time).
 *  - `routes`: rutas internas del sitio (referenciadas desde el código y
 *    desde algunos hrefs de los JSON cuando se necesita una ruta dinámica).
 */

/** Interruptor de la sección de planes: visible en revisión, apagado en producción. */
export const SHOW_PRICING = process.env.NEXT_PUBLIC_SHOW_PRICING === "true";

/**
 * Rutas internas. Centralizadas aquí (no en el JSON de i18n) porque son
 * valores de routing, no copy visible. Los hrefs en los componentes se
 * escriben directamente con estos strings o se interpolan en `messages/*.json`
 * cuando se necesite una etiqueta dinámica.
 */
export const routes: { readonly [k: string]: string } = {
  solicitarAlta: "/solicitar-alta",
  demo: "/demo",
  contacto: "/contacto",
  catalogo: "/catalogo",
  soluciones: "/soluciones",
};
