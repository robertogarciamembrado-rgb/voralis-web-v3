/**
 * Lógica de envío del formulario /contacto.
 *
 * TODO: conectar `enviarMensajeContacto` con la API autenticada de la plataforma
 *       (POST) antes del lanzamiento público.
 */

export type MensajeContacto = {
  nombre: string;
  organizacion: string;
  correo: string;
  motivo: string;
  mensaje: string;
  acepta_privacidad: true;
  acepta_comunicaciones: boolean;
  origen: "landing";
  enviado_el: string;               // ISO 8601
  idioma_navegador: string;
};

export async function enviarMensajeContacto(
  data: MensajeContacto,
): Promise<{ ok: boolean }> {
  // TODO: conectar con la API autenticada de la plataforma (POST) antes del lanzamiento público.
  if (process.env.NODE_ENV !== "production") {
    console.info("[contacto] payload de prueba", {
      ...data,
      correo: "***",
    });
  }
  return { ok: true };
}
