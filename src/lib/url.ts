/**
 * Validación de direcciones web compartida por el formulario /solicitar-alta
 * (campo `web` y `competidores[]`) y por `enviarSolicitudAlta`.
 */

/** Añade https:// si falta. Devuelve "" si el valor está vacío. */
export function normalizeUrl(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

/**
 * Una web es válida si, tras normalizarla, parsea con `new URL()` y su
 * hostname tiene al menos un punto, termina en un dominio de nivel superior
 * de 2 o más letras y no es `localhost` ni una IP. Se aceptan rutas.
 */
export function isValidWebUrl(raw: string): boolean {
  const norm = normalizeUrl(raw);
  if (!norm) return false;
  let host: string;
  try {
    host = new URL(norm).hostname.toLowerCase();
  } catch {
    return false;
  }
  if (host === "localhost" || host.startsWith("[")) return false; // localhost / IPv6
  const labels = host.split(".");
  if (labels.length < 2 || labels.some((l) => !l)) return false;
  const tld = labels[labels.length - 1];
  return /^[a-z]{2,}$/.test(tld) || /^xn--[a-z0-9-]{2,}$/.test(tld); // una IPv4 acaba en cifras
}
