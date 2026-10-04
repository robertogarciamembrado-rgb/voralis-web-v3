/**
 * Copy de la landing (secciones 1 a 5 y 7).
 *
 * Fuente única: documentacion/Voralis_Textos_Landing_v2.md
 *
 * Reglas:
 *  - Se trata al visitante de «usted».
 *  - Solo hay tres botones de acción: Solicitar alta, Ver la demo y Hablar con ventas
 *    (ver `actions` en content/site.ts).
 *  - La marca es Voralis; el producto, Voralis Vigilante. Pulse es «próximamente»
 *    y Congress, «bajo consulta».
 *  - Las cifras van siempre etiquetadas como «Dato real» o «Estimación».
 *
 * La sección 6 (Planes) vive en content/pricing.ts.
 */

import { actions } from "./site";

/** Fecha de exportación de la edición de ejemplo (pendiente de confirmar con producto). */
export const sampleExportDate = "24 de agosto de 2026";

/* -------------------------------------------------------------------------
   1 · PORTADA
   ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Inteligencia de negocio para anticiparse",
  headline: {
    lead: "Convierta la información de su entorno en",
    emphasis: "inteligencia para decidir mejor.",
  },
  subheadline:
    "Voralis Vigilante lee cada día las fuentes que importan en su sector, filtra el ruido y le entrega señales, alertas e informes con contexto y fuente, revisados por personas antes de publicarse.",
  primaryCta: actions.solicitarAlta,
  secondaryCta: actions.verDemo,
  note: "Configuramos su vigilante con usted. Primer radar en días.",
} as const;

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

/* -------------------------------------------------------------------------
   2 · PROBLEMA
   ------------------------------------------------------------------------- */

export const problem = {
  id: "que-es",
  eyebrow: "El punto de partida",
  headline: "Su sector publica más de lo que su equipo puede leer.",
  lead: "La información que importa está repartida entre medios especializados, organismos oficiales, estudios, think tanks y publicaciones del sector. El problema no es encontrarla: es saber qué importa, entender el contexto y enterarse a tiempo.",
  pillars: [
    {
      index: "01",
      icon: "link",
      title: "Reunir",
      body: "Hasta 150 fuentes de su sector en un solo radar.",
    },
    {
      index: "02",
      icon: "layers",
      title: "Entender",
      body: "Cada pieza puntuada por su relevancia para usted, con resumen y enlace a la fuente.",
    },
    {
      index: "03",
      icon: "radar",
      title: "Anticipar",
      body: "Señales débiles y tendencias antes de que sean titulares.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   3 · PARA QUÉ Y PARA QUIÉN
   ------------------------------------------------------------------------- */

export const capabilities = {
  id: "para-quien",
  eyebrow: "Para qué y para quién",
  headline: "Una misma inteligencia, al servicio de su organización.",
  items: [
    {
      title: "Inteligencia de mercado",
      icon: "trending",
      span: "feature" as const,
      body: "Tendencias, movimientos de sus competidores, regulación y oportunidades de su mercado.",
      footer: "Con Voralis Vigilante",
    },
    {
      title: "Vigilancia sectorial",
      icon: "radar",
      span: "normal" as const,
      body: "Fuentes especializadas en español e inglés, ordenadas por ejes y sectores, sin ruido.",
      footer: "Con Voralis Vigilante",
    },
    {
      title: "Alertas a tiempo",
      icon: "bell",
      span: "normal" as const,
      body: "Lo importante llega a su correo con la frecuencia que usted elija.",
      footer: "Con Voralis Vigilante",
    },
    {
      title: "Informes para decidir o publicar",
      icon: "filetext",
      span: "normal" as const,
      body: "Largo o Resumen, con su identidad visual y en seis idiomas, revisados antes de publicar.",
      footer: "Con Voralis Vigilante",
    },
    {
      title: "Reputación",
      icon: "megaphone",
      span: "muted" as const,
      body: "Qué se dice de su organización y cómo evoluciona la percepción.",
      badge: "Próximamente · Voralis Pulse",
    },
  ],

  audience: {
    title: "Para quién",
    /* `slug` coincide con el ancla de cada bloque en /soluciones. */
    items: [
      { label: "Medios", slug: "medios" },
      { label: "Consultoras", slug: "consultoras" },
      { label: "Think tanks", slug: "think-tanks" },
      { label: "Observatorios de destino", slug: "observatorios-de-destino" },
      { label: "Administraciones públicas", slug: "administraciones" },
      { label: "Empresas", slug: "empresas" },
      { label: "Gremios y asociaciones", slug: "gremios" },
      { label: "Universidades", slug: "universidades" },
      { label: "Agencias de comunicación", slug: "agencias" },
      { label: "Organizadores de eventos", slug: "eventos" },
      { label: "Inversores", slug: "inversores" },
    ],
    line: "¿Quiere ofrecer inteligencia a sus propios clientes? Voralis le permite convertirla en un servicio con su marca.",
  },
} as const;

/* -------------------------------------------------------------------------
   4 · RESULTADOS Y CASOS
   ------------------------------------------------------------------------- */

export const impact = {
  id: "resultados",
  eyebrow: "Resultados",
  headline: "Lo que hace Voralis cada día, en cifras.",

  headlineEstimate: {
    kind: "estimate" as const,
    value: "≈ 25 horas",
    unit: "de lectura",
    claim: "cubiertas en cada revisión completa de sus fuentes.",
    formula: "150 fuentes × 10 minutos = 1.500 minutos ≈ 25 horas",
  },

  metrics: [
    { kind: "real" as const, label: "piezas candidatas por ciclo", value: "Más de 150" },
    { kind: "real" as const, label: "piezas publicadas en la edición de julio", value: "37" },
    { kind: "real" as const, label: "ejes temáticos con representación en la edición de julio", value: "9 de 10" },
    { kind: "real" as const, label: "de todas las fuentes", value: "Lectura diaria" },
    /* Pendiente: confirmar el dato (15–20 min). */
    { kind: "estimate" as const, label: "Lectura del Resumen", value: "15–20 minutos" },
  ],
} as const;

export const cases = {
  id: "casos",
  client: "Tourism & Society Think Tank",
  body: "Tres redes del Think Tank trabajan con Voralis, cada una con su propio vigilante: la inteligencia turística del Think Tank, la World Religious Tourism Network y la World Cacao Tourism Network.",
  cta: { label: "Ver el catálogo", href: "/catalogo" },
} as const;

/* -------------------------------------------------------------------------
   5 · CÓMO FUNCIONA
   ------------------------------------------------------------------------- */

export const howItWorks = {
  id: "como-funciona",
  eyebrow: "Cómo funciona",
  headline: "De cientos de fuentes a un informe revisado, en un solo recorrido.",

  main: {
    name: "Voralis Vigilante",
    icon: "radar",
    /* Vídeo del alta (90 a 120 segundos): pendiente de recibir el archivo o la URL de incrustación. */
    video: { src: null as string | null, title: "Vídeo del alta de Voralis Vigilante" },
    journeyTitle: "El recorrido",
    steps: [
      {
        icon: "globe",
        title: "Fuentes públicas",
        body: "Medios, organismos, estudios y publicaciones de su sector.",
      },
      {
        icon: "eye",
        title: "Lectura diaria",
        body: "El vigilante lee, filtra y puntúa cada pieza según lo que a usted le importa.",
      },
      {
        icon: "radar",
        title: "Radar y noticias",
        body: "Lo relevante, ordenado por ejes y sectores, para consultar cada día.",
      },
      {
        icon: "filetext",
        title: "Borrador del informe",
        body: "La inteligencia artificial redacta el informe completo.",
      },
      {
        icon: "usercheck",
        title: "Revisión humana",
        body: "Su equipo lo edita y lo aprueba antes de publicar. Puede pedir cambios al asistente con sus propias palabras.",
      },
      {
        icon: "languages",
        title: "Versiones, Largo y Resumen",
        body: "El mismo texto revisado, en hasta seis idiomas: español, inglés, francés, alemán, portugués e italiano. Con su identidad visual, gráficos e imágenes.",
      },
    ],
    onboarding: {
      title: "Cómo es el alta",
      steps: [
        "Nos cuenta qué quiere vigilar",
        "Preparamos su perfil antes de la primera reunión",
        "Lo ajustamos con usted",
        "Primer radar en días",
      ],
    },
    guarantee:
      "Si en los primeros 30 días la primera cosecha no cumple lo que acordamos por escrito, le devolvemos el primer mes.",
    cta: actions.verDemo,
  },

  minor: [
    {
      name: "Voralis Pulse",
      icon: "waves",
      status: "Próximamente",
      body: "Entienda qué se dice de su organización y cómo evoluciona la conversación.",
      /* Lista de espera: lleva al formulario de contacto con el motivo precargado. */
      cta: { label: "Avisarme cuando esté disponible", href: "/contacto?motivo=pulse" },
    },
    {
      name: "Voralis Congress",
      icon: "presentation",
      status: "Bajo consulta",
      body: "Convierte eventos y congresos en conocimiento: lo que se dijo, quién lo dijo y qué queda para después.",
      cta: { ...actions.hablarVentas, href: `${actions.hablarVentas.href}?motivo=congress` },
    },
  ],

  trust: {
    body: "Fuentes públicas, análisis con IA y revisión humana. Cada informe identifica el contenido generado con IA.",
    /* El texto definitivo de las etiquetas lo valida Diana. */
    tags: ["Reglamento europeo de IA", "RGPD"],
  },
} as const;

/* -------------------------------------------------------------------------
   7 · LLAMADA FINAL
   ------------------------------------------------------------------------- */

export const finalCta = {
  id: "llamada-final",
  headline: "Entienda mejor lo que está pasando.",
  lead: "Cuéntenos qué necesita vigilar. Preparamos su perfil y se lo presentamos en la primera reunión.",
  primaryCta: actions.solicitarAlta,
  secondaryCta: actions.verDemo,
} as const;
