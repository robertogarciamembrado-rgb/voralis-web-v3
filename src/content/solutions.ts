/**
 * /soluciones — once casos de uso.
 * Fuente: documentacion/Voralis_Textos_Landing_v2.md. `slug` coincide con las
 * etiquetas de la fila «Para quién» de la landing (content/home.ts).
 */

export const solutions = {
  title: "Una misma inteligencia, once formas de sacarle partido.",
  labels: { watches: "Qué vigila", value: "Cómo genera valor", hiring: "Cómo se contrata", plan: "Plan recomendado" },
  items: [
    {
      slug: "medios",
      name: "Medios de comunicación",
      headline: "Convierta la actualidad de su sector en un producto propio.",
      watches: "su área de cobertura, las fuentes institucionales y los movimientos de los actores clave.",
      value: "temas para la redacción antes que la competencia, y una newsletter, sección premium o informe patrocinado con su propia marca.",
      plan: "Profesional.",
    },
    {
      slug: "consultoras",
      name: "Consultoras",
      headline: "Ofrezca inteligencia recurrente a sus clientes, con su marca.",
      watches: "el entorno de cada cliente: mercado, regulación y competencia.",
      value: "convierte proyectos puntuales en un servicio mensual. Un vigilante por cliente, informes con la identidad de la consultora y los equipos del cliente como lectores.",
      plan: "Profesional, con créditos adicionales a medida que sume clientes; Observatorio a partir de tres clientes.",
    },
    {
      slug: "think-tanks",
      name: "Think tanks y centros de pensamiento",
      headline: "Una agenda de investigación alimentada por datos, no por intuiciones.",
      watches: "política pública, literatura académica, otros think tanks y señales débiles por eje temático.",
      value: "informes institucionales periódicos, material para publicaciones y debates, y un vigilante por cada red o comunidad que anime.",
      plan: "Observatorio.",
    },
    {
      slug: "observatorios-de-destino",
      name: "Observatorios de destino",
      headline: "El observatorio turístico de su destino, siempre al día.",
      watches: "demanda, oferta, movilidad, sostenibilidad, reputación y competencia entre destinos.",
      value: "informes periódicos para la gestión del destino y para el sector local, con las empresas del territorio como lectores.",
      plan: "Observatorio.",
    },
    {
      slug: "administraciones",
      name: "Administraciones y organismos públicos",
      headline: "Política pública informada por lo que pasa, no por lo que se intuye.",
      watches: "cambios normativos, iniciativas de otras administraciones, financiación y tendencias de su sector o territorio.",
      value: "informes para decisores y equipos técnicos, vigilancia de riesgos y oportunidades, y material de contexto para estudios, informes anuales y jornadas.",
      hiring: "contrato anual adaptado a la vía de contratación de su organismo, con factura electrónica y revisión humana de cada informe antes de publicar.",
      plan: "Observatorio.",
    },
    {
      slug: "empresas",
      name: "Empresas",
      headline: "Vea venir los cambios de su mercado.",
      watches: "tendencias, competidores, clientes, regulación y oportunidades de su sector.",
      value: "decisiones estratégicas y comerciales con información al día, y un resumen periódico para dirección.",
      plan: "Profesional.",
    },
    {
      slug: "gremios",
      name: "Gremios, asociaciones y cámaras de comercio",
      headline: "Un servicio de inteligencia que sus asociados valoran cada mes.",
      watches: "el sector que representan y todo lo que afecta a sus asociados.",
      value: "suma valor a la cuota de socio: los asociados entran como lectores y los informes refuerzan su papel de interlocutor.",
      plan: "Profesional u Observatorio, según el número de asociados.",
    },
    {
      slug: "universidades",
      name: "Universidades y centros de investigación",
      headline: "Del estado del arte a la transferencia, sin perder el hilo.",
      watches: "publicaciones, convocatorias, política científica y aplicaciones de su campo.",
      value: "grupos de investigación sobre la misma vigilancia, material docente y detección de financiación.",
      plan: "Profesional por grupo de investigación.",
    },
    {
      slug: "agencias",
      name: "Agencias de comunicación y marketing",
      headline: "Ideas y argumentos para sus clientes, antes de que las pidan.",
      watches: "los temas, la conversación y la competencia del sector de cada cliente.",
      value: "contenidos apoyados en tendencias reales y un informe periódico como servicio añadido a cada contrato.",
      plan: "Profesional, con un vigilante por cliente.",
    },
    {
      slug: "eventos",
      name: "Organizadores de eventos, ferias y congresos",
      headline: "Programe lo que su sector va a querer escuchar.",
      watches: "temas emergentes, ponentes y organizaciones de referencia, y otros eventos del sector.",
      value: "programación con criterio y un informe de tendencias para asistentes o patrocinadores. Para convertir lo que ocurre en el propio evento en conocimiento, consulte Voralis Congress.",
      plan: "Profesional.",
    },
    {
      slug: "inversores",
      name: "Inversores y entidades financieras",
      headline: "Señales sectoriales para invertir y financiar con menos incertidumbre.",
      watches: "la evolución de los sectores de su cartera, cambios regulatorios y movimientos de los actores.",
      value: "análisis previo a la inversión, seguimiento de la cartera y detección temprana de riesgos, también como servicio para sus propios clientes.",
      plan: "Profesional u Observatorio.",
    },
  ],
} as const;
