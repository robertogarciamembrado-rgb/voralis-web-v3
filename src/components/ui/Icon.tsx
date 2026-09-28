import {
  GraduationCap,
  Layers,
  Library,
  Link2,
  Megaphone,
  Presentation,
  Radar,
  ScrollText,
  TrendingUp,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Registro de iconos.
 *
 * El contenido (`content/home.ts`) guarda un nombre, no un componente: así
 * sigue siendo datos puros, editable por el equipo de contenido sin tocar
 * imports de React. Este archivo es el único punto donde un nombre se
 * convierte en un icono, y también el único sitio donde se decide el grosor
 * de trazo — la coherencia de la iconografía depende de eso.
 */
const registry = {
  link: Link2,
  layers: Layers,
  radar: Radar,
  megaphone: Megaphone,
  trending: TrendingUp,
  library: Library,
  zap: Zap,
  waves: Waves,
  graduation: GraduationCap,
  presentation: Presentation,
  scroll: ScrollText,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = registry[name];
  /* aria-hidden siempre: los iconos acompañan a un titular que ya nombra el
     concepto. Anunciarlos duplicaría la lectura. */
  return <Glyph aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
