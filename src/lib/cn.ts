/**
 * Concatenador mínimo de clases. Sin dependencias externas: el proyecto no
 * necesita `clsx` para el volumen de condicionales que maneja.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
