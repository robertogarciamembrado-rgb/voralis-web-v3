/**
 * 6 · PLANES — copy y cifras.
 *
 * Fuente: documentacion/Voralis_Textos_Landing_v2.md (sección 6).
 * La sección solo se monta si `NEXT_PUBLIC_SHOW_PRICING=true` (ver `SHOW_PRICING`
 * en content/site.ts): visible en el entorno de revisión, apagada en producción.
 *
 * Precios y cupos están pendientes de cierre por Dirección. Impuestos no incluidos.
 *
 * Convención de importes: `{449}` marca una cifra monetaria; el componente la
 * pinta con el símbolo del selector EUR / USD y la MISMA cifra en ambas monedas.
 * La tabla de créditos por operación no se muestra en la landing.
 */

import { actions } from "./site";

export type Currency = "EUR" | "USD";

export const pricing = {
  id: "planes",
  headline: "Empiece viendo cómo trabaja. Crezca cuando lo necesite.",

  selectors: {
    billing: { label: "Facturación", monthly: "Mensual", annual: "Anual (dos meses gratis)" },
    currency: { label: "Moneda", options: ["EUR", "USD"] as const },
  },

  plans: {
    explorer: {
      name: "Explorador",
      price: "Gratis",
      audience: "Para ver cómo trabaja Voralis antes de hablar con nosotros.",
      features: [
        "Demo con datos reales",
        "Vídeo del alta",
        "Catálogo de informes de nuestros clientes",
        "Aviso por correo de nuevas ediciones",
      ],
      cta: actions.verDemo,
    },

    professional: {
      name: "Profesional",
      badge: "Recomendado para equipos",
      audience: "Para equipos que vigilan su propio entorno.",
      /* Solo el Profesional tiene selector Mensual / Anual. */
      monthly: { amount: "449", unit: "al mes" },
      annual: { amount: "4.490", unit: "al año" },
      features: [
        "**250 créditos al mes**, que alcanzan para un vigilante con uso completo o para dos con uso ligero",
        "Hasta 5 vigilantes, configurados con usted",
        "Hasta 150 fuentes y 3 competidores por vigilante",
        "Fuentes en español e inglés; informes en hasta seis idiomas",
        "Informes Largo y Resumen con su identidad visual, revisados por su equipo antes de publicar",
        "3 administradores y 25 lectores",
        "Asistente de IA y edición asistida de informes",
        "Alertas diarias o semanales · descarga en PDF y CSV",
      ],
      fineprint:
        "{4.490} al año. Alta: {490}, pago único; incluye la preparación de su perfil, una reunión de presentación y una ronda de ajustes. Garantía de devolución del primer mes.",
      cta: actions.solicitarAlta,
    },

    observatory: {
      name: "Observatorio",
      price: { prefix: "Desde", amount: "1.500", unit: "al mes" },
      audience: "Para instituciones que informan a todo un sector o territorio.",
      features: [
        "**1.000 créditos al mes**",
        "Vigilantes sin tope, con ejes y sectores propios",
        "Más de 150 fuentes y 10 competidores por vigilante",
        "Calidad de imagen alta y auditoría nuestra antes de publicar",
        "250 lectores y administradores a medida",
        "Recalibración trimestral y gestor dedicado",
        "Contrato anual con nivel de servicio pactado",
      ],
      note: "¿Es usted una administración pública? Le ofrecemos un contrato anual adaptado a la vía de contratación de su organismo.",
      cta: actions.hablarVentas,
    },
  },

  credit: {
    title: "Qué es un crédito",
    body: "Cada plan incluye una bolsa de créditos al mes. Cada vigilante activo usa una parte fija, y el resto se reparte entre informes, versiones en otros idiomas y el asistente, según lo que usted necesite. Si se queda corto, puede comprar más en cualquier momento. La lectura diaria de sus fuentes nunca se detiene.",
  },

  addons: {
    title: "Complementos",
    items: [
      { name: "100 créditos", price: "{149}, válidos doce meses" },
      { name: "500 créditos", price: "{649}, válidos doce meses" },
      { name: "Alta de un vigilante nuevo", price: "{290}" },
      { name: "25 lectores más", price: "{39} al mes" },
      { name: "Un administrador más", price: "{19} al mes" },
      { name: "Lectores de difusión", price: "100 por {99} al mes · 500 por {399} al mes" },
      { name: "Consultoría de configuración", price: "{90} la hora · 4 horas por {320}" },
      { name: "Informe auditado por un analista", price: "{290} por informe" },
    ],
    fineprint:
      "Impuestos no incluidos. Las condiciones de la garantía y de los créditos están en las condiciones del servicio.",
  },
} as const;

/** Sustituye cada `{cifra}` por el importe con el símbolo de la moneda elegida. */
export function formatMoney(template: string, currency: Currency): string {
  return template.replace(/\{([\d.]+)\}/g, (_, amount: string) =>
    currency === "EUR" ? `${amount} €` : `$${amount}`,
  );
}
