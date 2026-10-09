import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./config";
import { routing } from "./routing";

/**
 * Carga el diccionario de mensajes del locale activo en cada request.
 *
 * El bundler (webpack/turbopack) tree-shakea los JSON: solo entra en el
 * bundle del server el locale que se está renderizando, no todos. Esto
 * mantiene el bundle pequeño aunque la app tenga N idiomas.
 *
 * Si el locale no es válido (URL manipulada), cae al default. Esto evita
 * 500s por rutas malformadas y mantiene la web siempre navegable.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
