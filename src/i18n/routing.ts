import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

/**
 * Routing configuration para next-intl.
 *
 * `localePrefix: "always"` fuerza que TODAS las URLs lleven prefijo de
 * locale: `/es/...` y `/en/...`. No hay URLs canónicas sin locale, lo que
 * mantiene la web 100 % coherente con i18n y permite que cada idioma tenga
 * su propio sitemap e indexación en Google.
 *
 * El middleware asociado (src/middleware.ts) usa esta misma config para
 * detectar el locale de la URL y aplicar redirects cuando falta.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

/**
 * Wrappers de navegación conscientes del locale.
 *
 * `Link`, `useRouter` y `usePathname` de next/link y next/navigation NO
 * saben del prefijo de locale. Estos wrappers añaden el prefijo
 * automáticamente. Úsalos en lugar de los originales en componentes cliente.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
