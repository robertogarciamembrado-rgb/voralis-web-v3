import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import brandIcon from "@/content/Isotipo-Voralis-en-fondo-transparente.svg";
import "../globals.css";

/**
 * Inter auto-alojada (variable, subconjuntos latin y latin-ext) en lugar de
 * `next/font/google`.
 *
 * Motivos:
 * - Cero peticiones a dominios de terceros en producción: mejor rendimiento y
 *   evita la exposición RGPD del hotlinking a Google Fonts en la UE.
 * - El build no depende de la red, así que CI y entornos aislados compilan.
 *
 * Los ficheros viven en `src/fonts/` (SIL Open Font License, copia incluida).
 */
const inter = localFont({
  src: [
    {
      path: "../../fonts/inter-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../fonts/inter-latin-ext-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Site" });
  return {
    metadataBase: new URL("https://voralis.com"),
    icons: {
      icon: [{ url: brandIcon.src, type: "image/svg+xml" }],
    },
    title: {
      default: t("title"),
      template: t("titleTemplate", { title: "%s" }),
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      siteName: t("name"),
      title: t("title"),
      description: t("openGraphDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  /*
   * Habilita el renderizado estático de páginas bajo [locale]. Sin esto,
   * next-intl advierte y las páginas se renderizan dinámicamente.
   */
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Salto al contenido: primer tabulador de la página */}
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-raised focus:px-4 focus:py-2 focus:font-bold focus:text-fg focus:shadow-panel"
          >
            <SkipToContent />
          </a>
          <SiteHeader />
          <main id="contenido">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/**
 * El texto del enlace "Saltar al contenido" se renderiza dentro de un `<a>`
 * client component, pero la traducción es server-side. Lo extraemos aquí
 * para que `t(...)` se ejecute en el servidor y se inyecte como texto
 * estático en el HTML.
 */
async function SkipToContent() {
  const t = await getTranslations("Common");
  return <>{t("skipToContent")}</>;
}
