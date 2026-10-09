/**
 * Data del demo del dashboard que se muestra en el hero de la home.
 *
 * El resto del copy traducible de la home (eyebrows, headlines, body, etc.)
 * vive en `messages/{locale}.json` y se consume vía `getTranslations` de
 * next-intl. Aquí solo queda la data del dashboard simulado del cliente
 * Tourism & Society Think Tank, que es fija (mismo cliente en ambos idiomas)
 * y por ahora no se traduce.
 *
 * Si en el futuro se traduce también el contenido del dashboard, mover este
 * objeto a JSON con los strings dentro de namespaces.
 */

/** Fecha de exportación de la edición de ejemplo (pendiente de confirmar con producto). */
export const sampleExportDate = "24 de agosto de 2026";

/* Panel: datos del vigilante del Tourism & Society Think Tank (uso aprobado). */
export const heroDashboard = {
  sampleLabel: `Edición de ejemplo · ${sampleExportDate}`,
  client: "Tourism & Society Think Tank",
  title: "Radar Estratégico",
  navigation: ["Radar Estratégico", "Noticias relevantes", "Configuración", "Informes"],
  freshness: { label: `${sampleExportDate} · 12:39`, tone: "fresh" },

  /* Totales del periodo. El impacto se deriva de `impactMix` en el componente. */
  relevantTotal: 219,
  activeAxes: 10,

  activity: {
    label: "Actividad informativa",
    caption: "Últimos 30 días",
    series: [18, 24, 21, 32, 29, 42, 44, 54, 60, 57, 72, 67, 83, 88],
  },

  trending: {
    label: "Actividad por sectores",
    items: [
      { name: "Destinos y organismos", count: 80 },
      { name: "Agencias de viaje", count: 74 },
      { name: "Hoteles y alojamientos", count: 68 },
    ],
  },

  impactMix: [
    { label: "Alto", value: 1, tone: "high" },
    { label: "Medio", value: 464, tone: "mid" },
    { label: "Bajo", value: 0, tone: "low" },
  ],

  statement: "Datos reales del vigilante del Tourism & Society Think Tank.",
} as const;
