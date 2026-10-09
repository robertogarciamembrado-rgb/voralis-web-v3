/**
 * Configuración de i18n del proyecto.
 *
 * Idiomas soportados, idioma por defecto y el validador de tipos se centralizan
 * aquí. El resto del código importa `locales`, `defaultLocale` y
 * `Locale` desde este módulo en lugar de declarar los strings en cada sitio.
 */

export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Etiqueta legible del idioma para `<html lang>` y metadatos Open Graph. */
export const localeLabel: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/** Etiqueta corta del idioma para el toggle (mayúsculas, ancho fijo). */
export const localeShort: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

/** Locale BCP-47 para Open Graph y `lang` attribute. */
export const localeBcp47: Record<Locale, string> = {
  es: "es-ES",
  en: "en-US",
};

/** Type guard para valores externos (URL, cookies, headers). */
export function isLocale(value: string | null | undefined): value is Locale {
  return value !== null && value !== undefined && (locales as readonly string[]).includes(value);
}
