import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import brandIcon from "@/content/Isotipo-Voralis-en-fondo-transparente.svg";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

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
      path: "../fonts/inter-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/inter-latin-ext-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/**
 * Metadata según Voralis_Textos_Landing_v2.md: la marca es Voralis y el
 * producto, Voralis Vigilante. Todo el texto trata al visitante de «usted».
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://voralis.com"),
  icons: {
    icon: [{ url: brandIcon.src, type: "image/svg+xml" }],
  },
  title: {
    default: "Voralis — Inteligencia de negocio para anticiparse",
    template: "%s · Voralis",
  },
  description:
    "Voralis Vigilante lee cada día las fuentes que importan en su sector, filtra el ruido y le entrega señales, alertas e informes con contexto y fuente, revisados por personas antes de publicarse.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Voralis",
    title: "Voralis — Inteligencia de negocio para anticiparse",
    description:
      "Convierta la información de su entorno en inteligencia para decidir mejor.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090d" },
  ],
};

/**
 * Script anti-FOUC.
 *
 * Corre de forma síncrona antes del primer pintado y estampa el tema guardado
 * en `<html>`. Sin esto, quien eligió oscuro vería un fogonazo blanco en cada
 * carga: el HTML llega en claro y React no hidrata hasta después de pintar.
 *
 * Deliberadamente mínimo y envuelto en try/catch — el almacenamiento puede
 * lanzar en modo privado, y un fallo aquí bloquearía el render de la página.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("voralis-theme");if(t==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Red de seguridad para la animación al scroll: si no hay JavaScript,
            el contenido se muestra tal cual en lugar de quedar invisible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {/* Salto al contenido: primer tabulador de la página */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-raised focus:px-4 focus:py-2 focus:font-bold focus:text-fg focus:shadow-panel"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
