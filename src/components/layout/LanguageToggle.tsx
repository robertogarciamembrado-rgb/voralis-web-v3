"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeLabel, localeShort, type Locale } from "@/i18n/config";

/**
 * Selector de idioma.
 *
 * Navega a la URL equivalente en el otro locale usando los helpers de
 * next-intl. A diferencia del enfoque anterior (mutaba `<html lang>` desde
 * el cliente), aquí el cambio de idioma es una navegación real: la URL
 * cambia a `/en/...` o `/es/...`, y el servidor renderiza la página con
 * el diccionario correspondiente desde el primer byte (sin flash).
 *
 * El estado del locale activo se lee con `useLocale()`, que es la API
 * oficial de next-intl y se mantiene sincronizada con el segmento `[locale]`
 * de la URL.
 */
export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("Common");

  /**
   * Calcula el siguiente locale en la lista. Con solo 2 locales,
   * alternamos; con N locales, rotamos circularmente.
   */
  const nextLocale: Locale =
    locales[(locales.indexOf(currentLocale) + 1) % locales.length];

  const switchTo = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type="button"
      onClick={switchTo}
      aria-label={`${t("changeLanguage")} · ${localeLabel[currentLocale]}`}
      title={`${localeLabel[nextLocale]}`}
      className="flex h-9 items-center gap-1.5 rounded-xl border border-line px-2.5 text-fg-soft transition-colors duration-300 hover:bg-accent-soft hover:text-accent"
    >
      <Languages aria-hidden="true" className="size-[1rem]" strokeWidth={1.75} />
      <span className="text-xs font-bold uppercase tracking-wider">
        {localeShort[currentLocale]}
      </span>
    </button>
  );
}
