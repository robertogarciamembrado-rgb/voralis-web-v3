import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Middleware de next-intl.
 *
 * Para cada request entrante:
 *  1. Detecta el locale (URL > cookie > Accept-Language > default).
 *  2. Si la URL no tiene prefijo (`/catalogo` sin `/es/`), redirige a la
 *     versión con prefijo según el locale detectado.
 *  3. Si la URL tiene un locale desconocido (`/xx/catalogo`), redirige al
 *     default (`/es/catalogo`).
 *  4. Si todo está correcto, deja pasar la request.
 *
 * Esto garantiza que el servidor SIEMPRE recibe una URL con locale válido
 * y puede renderizar con el diccionario correcto desde el primer byte,
 * eliminando el flash de idioma en hard reloads.
 */
export default createMiddleware(routing);

export const config = {
  /*
   * Matcher: aplica a todas las rutas excepto:
   *  - api, _next, _vercel (internals de Next.js)
   *  - Archivos estáticos con extensión (svg, png, css, etc.)
   */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
