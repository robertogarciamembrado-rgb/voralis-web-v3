/**
 * Páginas secundarias: /catalogo, /demo, /preguntas-frecuentes, /solicitar-alta,
 * /contacto y /legal/*.
 *
 * Fuente: documentacion/Voralis_Textos_Landing_v2.md. Trato de «usted».
 * /soluciones vive en content/solutions.ts.
 */

import { sampleExportDate } from "./home";

/* ------------------------------ /catalogo ------------------------------ */

export const catalog = {
  title: "Informes de nuestros clientes.",
  lead: "Organizaciones que usan Voralis y publican sus informes. Cada informe lo publica su autor en su propia web.",
  networks: [
    {
      id: "tstt",
      name: "Tourism & Society Think Tank",
      /* Logos pendientes de confirmar: mientras tanto, monograma. */
      mark: "TSTT",
      color: "#0f766e",
      report: "Informe de Inteligencia Turística",
      watches:
        "Tendencias, impacto social, económico y cultural, y sostenibilidad del turismo",
      audience: "Profesionales, empresas e instituciones del turismo",
      summary: "Turismo y sociedad · 10 ejes · 11 sectores",
      languages: "ES · EN",
      available: true,
      status: "Mensual · Última: julio de 2026",
      cta: "Ver informe",
      /* Pendiente de confirmar la URL exacta del informe del TSTT. */
      href: "https://www.tourismandsocietytt.com/publications-articles",
    },
    {
      id: "wrtn",
      name: "World Religious Tourism Network",
      mark: "WRTN",
      color: "#7c3aed",
      report: "Radar del turismo religioso y espiritual",
      watches:
        "Destinos, organizaciones, empresas y expertos del turismo religioso y espiritual",
      audience: "Destinos, organizaciones y profesionales de Europa y América",
      summary: "Destinos, patrimonio y comunidades de fe",
      languages: "ES · EN",
      available: false,
      status: "Próximamente · primera edición",
      cta: "Conocer la red",
      href: "https://www.tourismandsocietytt.com/world-religious-tourism-network",
    },
    {
      id: "wctn",
      name: "World Cacao Tourism Network",
      mark: "WCTN",
      color: "#b45309",
      report: "Radar del turismo del cacao",
      watches:
        "Destinos y países productores, experiencias en torno al cacao, sostenibilidad y patrimonio local",
      audience:
        "Destinos, productores, operadores, universidades y comunidades locales",
      summary: "Destinos productores, cultura y experiencias",
      languages: "ES · EN",
      available: false,
      status: "Próximamente · primera edición",
      cta: "Conocer la red",
      href: "https://www.tourismandsocietytt.com/world-cacao-tourism-network",
    },
  ],
  badges: { available: "Disponible", soon: "Próximamente" },
  exitNotice: (network: string) =>
    `Va a salir de Voralis. Este informe lo publica ${network} en su web. Voralis no aloja ni sirve el informe.`,
  exitActions: { continue: "Continuar", cancel: "Cancelar" },
  footer: "¿Quiere que su informe aparezca aquí?",
} as const;

/* -------------------------------- /demo -------------------------------- */

export const demo = {
  title: "Así trabaja un vigilante de Voralis.",
  lead: "Esta es una edición de ejemplo con datos reales del vigilante del Tourism & Society Think Tank. Explore el radar y las noticias tal como las ve su equipo.",
  label: `Edición de ejemplo · ${sampleExportDate}`,
  blocks: {
    radar: "Radar",
    news: "Noticias relevantes",
    thumbnails: "Miniaturas del informe",
    video: "Vídeo del alta",
  },
  /* Los bloques de noticias, miniaturas y vídeo esperan el material exportado de la edición. */
  pending: "Contenido de la edición de ejemplo pendiente de exportar.",
  aiNote:
    "Los resúmenes se elaboran con inteligencia artificial a partir de fuentes públicas y con revisión humana.",
  closing: "¿Quiere un radar como este para su organización?",
} as const;

/* ------------------------ /preguntas-frecuentes ------------------------ */

export const faq = {
  title: "Preguntas frecuentes",
  items: [
    {
      q: "¿Qué es un vigilante?",
      a: "Es un motor de inteligencia configurado para su tema: un perfil, unos sectores, unos ejes temáticos y una lista de fuentes. Cada día lee lo publicado, lo puntúa por relevancia y le entrega solo lo que importa.",
    },
    {
      q: "¿De dónde sale la información?",
      a: "De fuentes públicas: medios sectoriales, organismos oficiales, universidades, think tanks y organizaciones de referencia. Cada pieza enlaza a su fuente original.",
    },
    {
      q: "¿Qué papel tiene la inteligencia artificial?",
      a: "Clasifica, puntúa y resume la información, y redacta el borrador de cada informe. Antes de publicar, una persona lo revisa y lo aprueba. Todo contenido generado con IA se identifica como tal.",
    },
    {
      q: "¿Cómo es el alta?",
      a: "Nos cuenta qué quiere vigilar y preparamos su perfil antes de la primera reunión. En esa reunión lo ajustamos con usted. La lectura diaria empieza el día de la activación y el primer radar llega en días.",
    },
    {
      q: "¿Y si el resultado no es el acordado?",
      a: "Si en los primeros 30 días la primera cosecha no cumple lo que acordamos por escrito, le devolvemos el primer mes. Su configuración es suya y puede llevársela.",
    },
    {
      q: "¿Qué son los créditos?",
      a: "Cada plan incluye una bolsa de créditos al mes. Cada vigilante activo usa una parte fija, y el resto se reparte entre informes, versiones en otros idiomas y el asistente. Si se queda corto, puede comprar más. La lectura diaria de sus fuentes nunca se detiene por falta de créditos.",
    },
    {
      q: "¿En qué idiomas están los informes?",
      a: "Las fuentes se leen en español e inglés. El informe se redacta en español o en inglés, y puede tener versiones revisadas en francés, alemán, portugués e italiano.",
    },
    {
      q: "¿Puedo cambiar lo que vigilo?",
      a: "Sí. Sus administradores ajustan fuentes, palabras clave, ejes y sectores cuando lo necesiten, dentro de su plan.",
    },
    {
      q: "¿Quién de mi equipo puede entrar?",
      a: "Los administradores configuran y gestionan. Los lectores tienen uno de cuatro niveles: consulta, informes, analista o curador.",
    },
    {
      q: "¿Puedo compartir los informes fuera de mi organización?",
      a: "Sí. Puede publicarlos en su web o dar acceso a lectores externos, y decidir si les cobra.",
    },
    {
      q: "¿Puede contratar una administración pública?",
      a: "Sí. Ofrecemos un contrato anual adaptado a la vía de contratación de cada organismo, con factura electrónica y revisión humana de cada informe.",
    },
    {
      q: "¿Puedo cancelar?",
      a: "Sí. Los planes mensuales no tienen permanencia. Si cancela, conservamos sus vigilantes congelados durante 90 días por si vuelve, y su configuración se puede exportar.",
    },
    {
      q: "¿Los informes del catálogo son de Voralis?",
      a: "No. Cada informe lo publica la organización que lo elabora, en su propia web, y responde de su contenido.",
    },
  ],
} as const;

/* --------------------------- /solicitar-alta --------------------------- */

export const signup = {
  title: "Cuéntenos qué necesita vigilar.",
  lead: "Déjenos su web. Nuestro sistema analiza cómo se presenta su organización y prepara una primera radiografía, que le presentaremos en la reunión para ajustarla con usted.",
  fields: {
    web: {
      label: "Web de su organización",
      help: "Puede ser la web principal o la página que mejor describa su organización o red.",
    },
    tipo: { label: "Tipo de organización" },
    nombre: { label: "Nombre y apellidos" },
    cargo: { label: "Cargo" },
    correo: { label: "Correo electrónico" },
    telefono: { label: "Teléfono" },
    competidores: {
      label: "Competidores o referentes",
      help: "Webs de organizaciones con las que se compara o que quiere seguir de cerca.",
      addButton: "Añadir otro",
    },
    prioridades: {
      label: "¿Qué le gustaría vigilar o qué le preocupa?",
      maxLength: 500,
    },
  },
  tiposOrganizacion: [
    { value: "medio",                label: "Medio de comunicación" },
    { value: "consultora",           label: "Consultora" },
    { value: "think_tank",           label: "Think tank o centro de pensamiento" },
    { value: "observatorio_destino", label: "Observatorio de destino" },
    { value: "administracion",       label: "Administración u organismo público" },
    { value: "empresa",              label: "Empresa" },
    { value: "gremio",               label: "Gremio, asociación o cámara de comercio" },
    { value: "universidad",          label: "Universidad o centro de investigación" },
    { value: "agencia",              label: "Agencia de comunicación o marketing" },
    { value: "eventos",              label: "Organizador de eventos, ferias o congresos" },
    { value: "inversor",             label: "Inversor o entidad financiera" },
  ],
  submit: "Solicitar alta",
  submitting: "Enviando\u2026",
  note: "No hay ningún compromiso hasta que acepte la propuesta.",
  confirmation: {
    title: "Gracias.",
    text: "Estamos analizando cómo se presenta su organización en su web. Le escribiremos para agendar la reunión en la que le enseñamos el resultado.",
  },
  errorFallback:
    "No hemos podido enviar su solicitud. Inténtelo de nuevo o escríbanos desde Contacto.",
  errors: {
    required: "Este campo es obligatorio.",
    url: "Indique una dirección web válida, por ejemplo www.suorganizacion.com.",
    email: "Indique un correo electrónico válido.",
    privacy: "Para continuar, acepte la política de privacidad.",
  },
  consent: {
    privacyPrefix: "Acepto la ",
    privacyLinkText: "política de privacidad",
    privacyLinkHref: "/legal/privacidad",
    privacySuffix:
      " y que Voralis analice con inteligencia artificial la información pública de las webs indicadas para preparar mi propuesta.",
    communications: "Quiero recibir novedades e información comercial de Voralis.",
  },
} as const;

/* ------------------------------- /contacto ------------------------------ */

export const contact = {
  title: "Hablemos.",
  lead: "Para planes Observatorio, administraciones públicas, Voralis Congress o cualquier consulta.",
  reasons: [
    { value: "observatorio", label: "Observatorio" },
    { value: "administracion", label: "Administración pública" },
    { value: "congress", label: "Voralis Congress" },
    { value: "pulse", label: "Lista de espera de Voralis Pulse" },
    { value: "otro", label: "Otro" },
  ],
  fields: {
    nombre: "Nombre",
    organizacion: "Organización",
    correo: "Correo electrónico",
    motivo: "Motivo",
    mensaje: "Mensaje",
  },
  /* motivo=pulse: el mensaje es opcional */
  mensajePulseHelp: "Le avisaremos por correo cuando Voralis Pulse esté disponible.",
  submit: "Hablar con ventas",
  submitting: "Enviando\u2026",
  confirmation: {
    title: "Gracias.",
    text: "Le responderemos lo antes posible.",
    /* motivo=pulse (lista de espera) */
    textPulse: "Le avisaremos en cuanto Voralis Pulse esté disponible.",
  },
  errorFallback:
    "No hemos podido enviar su mensaje. Inténtelo de nuevo o escríbanos directamente.",
  errors: {
    required: "Este campo es obligatorio.",
    email: "Indique un correo electrónico válido.",
    privacy: "Para continuar, acepte la política de privacidad.",
  },
  consent: {
    privacyPrefix: "Acepto la ",
    privacyLinkText: "política de privacidad",
    privacyLinkHref: "/legal/privacidad",
    privacySuffix: " y que Voralis utilice mis datos para responder a mi consulta.",
    communications: "Quiero recibir novedades e información comercial de Voralis.",
  },
} as const;

/* -------------------------------- /legal -------------------------------- */

export const legalPages = {
  "aviso-legal": "Aviso legal",
  privacidad: "Privacidad",
  condiciones: "Condiciones",
  "uso-de-ia": "Uso de IA",
  cookies: "Cookies",
} as const;

export type LegalSlug = keyof typeof legalPages;

export const legalPlaceholder =
  "Texto legal provisional. El texto definitivo está pendiente de validación jurídica y se publicará aquí.";
