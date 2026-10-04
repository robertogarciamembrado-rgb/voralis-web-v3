/**
 * Lógica de envío del formulario /solicitar-alta.
 *
 * Las solicitudes entran en estado "pendiente_revision": el análisis de la web
 * lo lanza el equipo de Voralis manualmente tras revisarlas.
 *
 * TODO: conectar `enviarSolicitudAlta` con la API autenticada de la plataforma
 *       (POST) antes del lanzamiento público.
 */

import { isValidWebUrl } from "./url";

export type SolicitudAlta = {
  web: string;                      // URL normalizada con https://
  tipo_organizacion: string;
  nombre: string;
  cargo: string;
  correo: string;
  telefono?: string;
  competidores: string[];           // 0 a 3 URL normalizadas
  prioridades?: string;
  plan?: "profesional" | "observatorio";
  acepta_privacidad: true;
  acepta_comunicaciones: boolean;
  origen: "landing";
  estado: "pendiente_revision";     // revisión previa: no lanza el análisis
  enviada_el: string;               // ISO 8601
  idioma_navegador: string;
};

export async function enviarSolicitudAlta(
  data: SolicitudAlta,
): Promise<{ ok: boolean }> {
  // Misma regla de direcciones web que el formulario: no se confía solo en el cliente.
  if (!isValidWebUrl(data.web) || !data.competidores.every(isValidWebUrl)) {
    return { ok: false };
  }
  // TODO: conectar con la API autenticada de la plataforma (POST) antes del lanzamiento público.
  // La API guarda la solicitud en estado "pendiente_revision"; el análisis lo lanza el equipo tras revisarla.
  if (process.env.NODE_ENV !== "production") {
    console.info("[solicitar-alta] payload de prueba", {
      ...data,
      correo: "***",
      telefono: data.telefono ? "***" : undefined,
    });
  }
  return { ok: true };
}
