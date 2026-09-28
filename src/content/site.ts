/**
 * Navegación y datos globales del sitio.
 *
 * Regla del brief (§5): el menú NO contiene "Agentes". Los agentes
 * especializados viven dentro de "Cómo funciona".
 * Regla del brief (§16): TS Orbix no aparece en el hero ni en el mensaje
 * comercial principal — solo puede aparecer en el footer / contexto
 * institucional.
 */

export const nav = {
  items: [
    { label: "Qué es VORALIS", href: "#que-es" },
    { label: "Casos de uso", href: "#capacidades" },
    { label: "Resultados", href: "#resultados" },
    { label: "Cómo funciona", href: "#como-funciona" },
  ],
  cta: { label: "Explorar VORALIS", href: "#contacto" },
} as const;

export const footer = {
  tagline:
    "Plataforma de inteligencia y conocimiento. Conecta información interna y externa para entender qué está pasando y decidir mejor.",
  /* Única ubicación permitida para la referencia institucional (brief §16). */
  institutional: "VORALIS forma parte del ecosistema TS Orbix.",
  columns: [
    {
      title: "Plataforma",
      links: [
        { label: "Qué es VORALIS", href: "#que-es" },
        { label: "Capacidades", href: "#capacidades" },
        { label: "Cómo funciona", href: "#como-funciona" },
      ],
    },
    {
      title: "Evidencia",
      links: [
        { label: "Resultados e impacto", href: "#resultados" },
        { label: "Tourism & Society Think Tank", href: "#casos" },
        { label: "Trabitat", href: "#casos" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: "Explorar mi caso", href: "#contacto" },
        { label: "Aviso legal", href: "/legal" },
        { label: "Privacidad", href: "/privacidad" },
      ],
    },
  ],
} as const;
