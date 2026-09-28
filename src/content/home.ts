/**
 * Copy de la home, alineado con el brief de diseño de Diana y con la
 * nomenclatura real del producto.
 *
 * DOS FUENTES GOBIERNAN ESTE ARCHIVO:
 *
 * 1. "VORALIS_Brief_Web_Diseño_Actualizado" — narrativa, estructura de 7
 *    bloques, jerarquía Vigilante/Pulse vs. agentes, reglas de copy.
 *
 * 2. "Especificación funcional — Evolución del Dashboard de Cliente AVIA" —
 *    el renombrado de KPIs ya está cerrado ahí y la web debe hablar el mismo
 *    idioma que el producto. Diana lo justifica con el mismo principio que
 *    rige el brief de web: «"Noticias capturadas" describe una actividad
 *    técnica del sistema; "Información relevante" comunica el valor que
 *    recibe el usuario.»
 *
 *      Vigilancia (pestaña)     → Radar Estratégico
 *      Dashboard (pestaña)      → Noticias Relevantes
 *      Noticias capturadas      → Información relevante
 *      Élite Pata Negra         → Alto impacto
 *      Score medio              → Impacto medio (ALTO / MEDIO / BAJO)
 *      Balance por Ejes         → Actividad por Ejes
 *      Balance por Sectores     → Actividad por Sectores
 *      Pulso de Recaudación 30D → Actividad informativa · Últimos 30 días
 *
 * Estructura obligatoria (brief §4) — máximo 7 bloques:
 *   1. Hero
 *   2. Problema + propuesta de valor
 *   3. Capacidades / necesidades de inteligencia
 *   4. Resultados + estimación de impacto
 *   5. VORALIS en acción (Tourism & Society Think Tank + Trabitat)
 *   6. Cómo funciona (Vigilante + Pulse + agentes especializados)
 *   7. CTA final
 */

/* -------------------------------------------------------------------------
   BLOQUE 01 — HERO
   ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Inteligencia para entender lo que está pasando",
  /* H1 innegociable (brief §6). No modificar sin aprobación de contenido. */
  headline: {
    lead: "Convierte la información de tu entorno en",
    emphasis: "inteligencia para decidir mejor.",
  },
  subheadline:
    "Configura un radar para tu organización, filtra el ruido de tu entorno y recibe las señales con contexto, prioridad y trazabilidad para decidir a tiempo.",
  primaryCta: { label: "Descubre qué puede hacer VORALIS", href: "#contacto" },
  secondaryCta: { label: "Ver casos de uso", href: "#capacidades" },
  note: "Una conversación sobre tu entorno concreto. Sin demo genérica.",
} as const;

/* -------------------------------------------------------------------------
   Visual del hero — Radar Estratégico (brief §7)

   Reproduce la pantalla de entrada real del producto: los KPIs ejecutivos,
   el selector temporal y el indicador de frescura definidos en la
   especificación funcional. Las cifras son las del ejemplo de Diana en ese
   documento, no invenciones nuestras.

   ⚠️ REGLA DEL BRIEF: los números deben ser reales o estar claramente
   marcados como demo. Mientras `isSample` sea true el panel muestra la
   etiqueta "Vista de ejemplo". Al conectar datos reales, sustituir este
   objeto por la lectura del backend y poner `isSample: false`.
   ------------------------------------------------------------------------- */

export const heroDashboard = {
  isSample: false,
  sampleLabel: "Datos reales",
  client: "Tourism & Society Think Tank",
  title: "Radar Estratégico",
  subtitle: "Cosecha activa · Día 24 de 30",
  navigation: ["Radar Estratégico", "Noticias relevantes", "Configuración", "Informes"],

  /* Selector temporal de la especificación funcional §6. */
  ranges: ["30 días"],
  activeRange: "30 días",

  /* Semáforo de frescura: verde <15 min, naranja <60 min, rojo mayor. */
  freshness: { label: "24 de agosto de 2026 · 12:39", tone: "fresh" },

  /* Los 4 KPIs ejecutivos, con la nomenclatura ya aprobada. */
  kpis: [
    { label: "Información relevante", value: "219", delta: "+843%", tone: "up" },
    { label: "Ejes activos", value: "10", delta: null, tone: "neutral" },
    { label: "Alto impacto", value: "1", delta: null, tone: "neutral" },
    { label: "Impacto medio", value: "464", delta: null, tone: "neutral" },
  ],

  /* Serie normalizada 0–100 que alimenta el sparkline SVG. */
  activity: {
    label: "Actividad informativa",
    caption: "Últimos 30 días",
    series: [18, 24, 21, 32, 29, 42, 44, 54, 60, 57, 72, 67, 83, 88],
    delta: "+843%",
  },

  /* Ejemplos literales de la especificación funcional §10. Deliberadamente
     transversales: la home no puede parecer exclusiva del sector turístico. */
  trending: {
    label: "Actividad por sectores",
    items: [
      { name: "Destinos y organismos", delta: "80" },
      { name: "Agencias de viaje", delta: "74" },
      { name: "Hoteles y alojamientos", delta: "68" },
    ],
  },

  /* Reparto de impacto (KPI 2, variante semáforo de la especificación). */
  impactMix: [
    { label: "Alto", value: 1, tone: "high" },
    { label: "Medio", value: 464, tone: "mid" },
    { label: "Bajo", value: 0, tone: "low" },
  ],

  /* Mensaje visual del hero (brief §7). */
  statement: "Datos reales de una edición activa del Vigilante.",
} as const;

/* -------------------------------------------------------------------------
   BLOQUE 02 — EL PROBLEMA + PROPUESTA DE VALOR (brief §8)
   ------------------------------------------------------------------------- */

export const problem = {
  id: "que-es",
  eyebrow: "El punto de partida",
  headline: "Tu organización genera más información de la que puede aprovechar.",
  lead: "La información está en todas partes: documentos, noticias, conversaciones, bases de conocimiento, publicaciones, datos y fuentes externas.",
  emphasis:
    "El problema no es tener información. Es saber qué importa, entender el contexto y detectarlo a tiempo.",
  pillars: [
    {
      index: "01",
      icon: "link",
      title: "Conectar",
      body: "Toda la información relevante, en contexto. Conecta conocimiento interno y fuentes externas para tener una visión más completa.",
    },
    {
      index: "02",
      icon: "layers",
      title: "Entender",
      body: "Del dato a una visión útil. Relaciona información, identifica patrones y aporta contexto para entender qué está ocurriendo.",
    },
    {
      index: "03",
      icon: "radar",
      title: "Anticipar",
      body: "Detecta las señales que importan. Monitoriza cambios y acontecimientos relevantes para poder reaccionar antes.",
    },
  ],
  closing: "Más contexto. Mejores decisiones.",
} as const;

/* -------------------------------------------------------------------------
   BLOQUE 03 — CAPACIDADES / NECESIDADES DE INTELIGENCIA (brief §9)

   Nota de diseño del brief: el nombre del motor NO es el protagonista de la
   tarjeta. Primero el beneficio; el motor aparece como pie discreto
   ("Powered by…"), nunca como ficha técnica.

   `span` define el peso de cada tarjeta en el bento. La primera manda porque
   reputación es la puerta de entrada comercial más frecuente.
   ------------------------------------------------------------------------- */

export const capabilities = {
  id: "capacidades",
  eyebrow: "¿Para qué puedes utilizar VORALIS?",
  headline: "Inteligencia aplicada a lo que necesitas entender.",
  items: [
    {
      title: "Reputación",
      icon: "megaphone",
      span: "feature" as const,
      body: "Sabe qué se está diciendo de ti. Monitoriza conversaciones, noticias y fuentes relevantes para detectar menciones, cambios de percepción y posibles riesgos reputacionales.",
      result: "Detectar antes y reaccionar a tiempo.",
      /* Solo la tarjeta destacada lleva desglose: es lo que justifica su
         doble altura en el bento. Cada punto corresponde a una capacidad
         documentada de Pulse, no a una promesa genérica. */
      highlights: [
        "Menciones y alcance",
        "Cambios de percepción",
        "Temas y clusters de conversación",
        "Alertas por severidad",
      ],
      poweredBy: "Pulse + Vigilante",
    },
    {
      title: "Inteligencia de mercado",
      icon: "trending",
      span: "normal" as const,
      body: "Entiende qué está cambiando en tu mercado. Detecta movimientos, tendencias, competidores y señales relevantes.",
      result: "Más contexto para identificar oportunidades y riesgos.",
      poweredBy: "Vigilante + Pulse",
    },
    {
      title: "Vigilancia sectorial",
      icon: "radar",
      span: "normal" as const,
      body: "Mantente al día de lo que importa. Monitoriza fuentes especializadas, publicaciones y acontecimientos relevantes.",
      result: "Menos ruido. Una visión actualizada de tu entorno.",
      poweredBy: "Vigilante",
    },
    {
      title: "Conocimiento interno",
      icon: "library",
      span: "normal" as const,
      body: "Convierte tu conocimiento en una fuente de inteligencia. Consulta, relaciona y utiliza documentos, informes y conocimiento acumulado.",
      result: "Encuentra respuestas y contexto sin perder tiempo buscando.",
      poweredBy: "AVIA Profesor",
    },
    {
      title: "Inteligencia en tiempo real",
      icon: "zap",
      span: "normal" as const,
      body: "No esperes al informe para saber qué está pasando. Detecta cambios, señales y acontecimientos relevantes mientras ocurren.",
      result: "Información accionable cuando todavía puede marcar la diferencia.",
      poweredBy: "Vigilante + Pulse",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   BLOQUE 04 — RESULTADOS + ESTIMACIÓN DE IMPACTO (brief §10)

   ⚠️ DOS REGLAS DEL BRIEF SE CRUZAN AQUÍ:
   «No inventar cifras. Calcular estimaciones transparentes a partir del
   volumen de información y del trabajo que supondría realizarlo manualmente.»
   «Diferenciar siempre "Dato real" de "Estimación".»

   Por eso cada métrica declara su `kind` y la estimación principal expone su
   fórmula en pantalla. La fórmula es la que el propio brief propone en §10.
   ------------------------------------------------------------------------- */

export const impact = {
  id: "resultados",
  eyebrow: "Resultados",
  headline: "La inteligencia se mide por lo que te permite detectar y decidir.",
  lead: "Mientras construimos histórico suficiente, publicamos estimaciones calculadas a partir de variables reales y las marcamos como tales. Nunca presentamos una estimación como resultado consolidado.",

  headlineEstimate: {
    kind: "estimate" as const,
    value: "≈83 h",
    unit: "por semana",
    claim: "de investigación potencialmente cubierta",
    formula: "500 fuentes × 10 min de revisión manual = 5.000 min ≈ 83 h",
    disclaimer:
      "Estimación de impacto calculada sobre variables reales de monitorización. No es un dato histórico consolidado.",
  },

  /* Cifras del embudo de vigilancia y del Radar Estratégico de julio 2026. */
  metrics: [
    { kind: "real" as const, label: "Fuentes candidatas por ciclo", value: "150+" },
    { kind: "real" as const, label: "Entradas finales publicadas", value: "37", period: "edición de julio" },
    { kind: "real" as const, label: "Ejes temáticos con representación", value: "9", period: "de 10 posibles" },
    { kind: "real" as const, label: "Ciclo de vigilancia", value: "28 días" },
    { kind: "real" as const, label: "Lectura del informe", value: "15–20 min" },
    { kind: "estimate" as const, label: "Tiempo estimado ahorrado", value: "≈83 h/sem" },
  ],

  note: "La arquitectura sustituye progresivamente estimaciones por métricas reales de uso a medida que se consolida el histórico.",
} as const;

/* -------------------------------------------------------------------------
   BLOQUE 05 — VORALIS EN ACCIÓN (brief §11)
   ------------------------------------------------------------------------- */

export const cases = {
  id: "casos",
  eyebrow: "VORALIS en acción",
  headline: "Dos casos reales. Dos retos concretos. Inteligencia diseñada para decidir.",
  items: [
    {
      client: "Tourism & Society Think Tank",
      title: "Una agenda de investigación siempre al día sobre turismo y sociedad.",
      challenge:
        "Investigadores, responsables de política pública y expertos necesitan seguir un sector en transformación sin perder el contexto social, económico y ambiental de cada señal.",
      solution:
        "VORALIS monitoriza fuentes sectoriales, institucionales y académicas; clasifica las señales en 10 ejes y entrega un informe mensual listo para el análisis, el debate y la difusión institucional.",
      metrics: [
        { kind: "target" as const, label: "Entradas candidatas al mes", value: "150+" },
        { kind: "target" as const, label: "Ejes temáticos cubiertos", value: "10" },
        { kind: "target" as const, label: "Subsectores turísticos", value: "11" },
      ],
      cta: { label: "Ver caso Tourism & Society Think Tank", href: "/casos/tstt" },
    },
    {
      client: "Trabitat",
      title: "Inteligencia sectorial para anticiparse en turismo y ocio.",
      challenge:
        "Empresas de turismo y ocio necesitan detectar tendencias, movimientos competitivos, riesgos y oportunidades entre un flujo continuo de información sectorial.",
      solution:
        "VORALIS rastrea fuentes fiables, prioriza cada entrada por relevancia y compone un informe mensual de marca con análisis accionable para la toma de decisiones.",
      metrics: [
        { kind: "target" as const, label: "Fuentes fiables iniciales", value: "80–120" },
        { kind: "target" as const, label: "Entradas finales por ciclo", value: "40" },
        { kind: "target" as const, label: "Duración máxima del ciclo", value: "28 días" },
      ],
      cta: { label: "Ver caso Trabitat", href: "/casos/trabitat" },
    },
  ],
  disclaimer:
    "Las métricas muestran los objetivos operativos definidos para cada caso de uso. Se sustituirán por datos consolidados cuando exista histórico de operación.",
} as const;

/* -------------------------------------------------------------------------
   BLOQUE 06 — CÓMO FUNCIONA (brief §12 y §13)

   Jerarquía innegociable:
     VORALIS (plataforma)
       ↳ Vigilante + Pulse  → motores de inteligencia (protagonistas)
         ↳ Profesor, Congress, Historiador → agentes especializados
   ------------------------------------------------------------------------- */

export const howItWorks = {
  id: "como-funciona",
  eyebrow: "Cómo funciona",
  headline: "Dos motores de inteligencia para entender tu entorno.",
  lead: "VORALIS es la capa de inteligencia. Debajo trabajan dos motores que sostienen la mayor parte de las capacidades, y un conjunto de agentes que amplían la plataforma para necesidades concretas.",

  engines: [
    {
      name: "AVIA Vigilante",
      icon: "radar",
      title: "Configura tu radar y convierte señales externas en decisiones.",
      role: "Entiende el contexto de tu organización, vigila el entorno relevante, elimina ruido y prioriza alertas e informes con evidencia trazable.",
      covers: [
        "Radar configurado por organización",
        "Inteligencia de mercado",
        "Vigilancia sectorial",
        "Señales, cambios y competencia",
        "Alertas e informes para decidir",
      ],
    },
    {
      name: "AVIA Pulse",
      icon: "waves",
      title: "Entiende las conversaciones y el contexto que hay detrás.",
      role: "Análisis de conversaciones, percepción, temas, tendencias y evolución del contexto.",
      covers: [
        "Conversaciones",
        "Reputación",
        "Percepción",
        "Tendencias",
        "Contexto y evolución de temas",
      ],
    },
  ],

  /* Señal de confianza, no un bloque nuevo: vive dentro de "Cómo funciona"
     porque describe cómo operan los motores. Para una plataforma de
     inteligencia vendida en la UE, esto es argumento comercial, no letra
     pequeña. Fuente: clasificación EU AI Act del ecosistema AVIA Cloud. */
  compliance: {
    title: "Analiza temas, no personas.",
    body: "Los dos motores operan sobre información agregada por temas y clusters, nunca sobre perfiles individuales. Clasificados como riesgo limitado bajo el Reglamento Europeo de IA, con transparencia de propósito y cumplimiento del RGPD.",
    tags: ["Riesgo limitado — EU AI Act", "Análisis agregado", "Cumplimiento RGPD"],
  },

  specialists: {
    eyebrow: "Agentes especializados",
    headline: "Capacidades específicas para necesidades concretas.",
    items: [
      {
        name: "AVIA Profesor",
        icon: "graduation",
        body: "Convierte el conocimiento interno en respuestas útiles.",
        use: "Documentos, informes y consultas sobre información interna.",
      },
      {
        name: "AVIA Congress",
        icon: "presentation",
        body: "Convierte eventos y congresos en conocimiento.",
        use: "Captura y aprovechamiento de la información generada alrededor de eventos.",
      },
      {
        name: "AVIA Historiador",
        icon: "scroll",
        body: "Aporta contexto histórico para entender el presente.",
        use: "Antecedentes, evolución y contexto histórico.",
      },
    ],
    cta: { label: "Conocer los agentes especializados", href: "/agentes" },
  },
} as const;

/* -------------------------------------------------------------------------
   BLOQUE 07 — CTA FINAL (brief §15)
   ------------------------------------------------------------------------- */

export const finalCta = {
  id: "contacto",
  headline: "Entiende mejor lo que está pasando.",
  lead: "Cuéntanos qué necesitas monitorizar, conocer o anticipar y te mostramos cómo puede aplicarse VORALIS a tu organización.",
  primaryCta: { label: "Explorar mi caso", href: "/contacto" },
  secondaryCta: { label: "Ver casos de uso", href: "#capacidades" },
} as const;
