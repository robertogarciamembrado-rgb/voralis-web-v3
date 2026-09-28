import { cn } from "@/lib/cn";

/**
 * Sparkline de área en SVG inline. Sin librería de charts: la serie es corta,
 * el gráfico acompaña a una cifra que ya está escrita, y así el hero no envía
 * JavaScript.
 *
 * `preserveAspectRatio="none"` permite que ocupe todo el ancho disponible;
 * `vector-effect="non-scaling-stroke"` evita que el trazo se deforme al
 * estirarse horizontalmente.
 */

const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 88;
const PADDING_Y = 10;
/* Margen horizontal para que el punto del último valor no quede cortado. */
const PADDING_X = 5;

function buildPoints(series: readonly number[]) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const usableWidth = VIEWBOX_WIDTH - PADDING_X * 2;
  const usableHeight = VIEWBOX_HEIGHT - PADDING_Y * 2;
  const stepX = usableWidth / (series.length - 1);

  return series.map((value, index) => {
    const x = PADDING_X + index * stepX;
    const y = PADDING_Y + usableHeight - ((value - min) / range) * usableHeight;
    return { x, y };
  });
}

export function Sparkline({
  series,
  className,
  label,
}: {
  series: readonly number[];
  className?: string;
  /** Descripción textual para lectores de pantalla. */
  label: string;
}) {
  const points = buildPoints(series);
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${VIEWBOX_WIDTH - PADDING_X},${VIEWBOX_HEIGHT} L${PADDING_X},${VIEWBOX_HEIGHT} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      className={cn("h-[4.5rem] w-full", className)}
    >
      <defs>
        <linearGradient id="voralis-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rejilla de referencia, deliberadamente tenue */}
      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1="0"
          x2={VIEWBOX_WIDTH}
          y1={VIEWBOX_HEIGHT * ratio}
          y2={VIEWBOX_HEIGHT * ratio}
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <path d={area} fill="url(#voralis-spark-fill)" />
      <path
        d={line}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="animate-trace"
      />

      {/* Punto del último valor: ancla la lectura en "ahora" */}
      <circle
        cx={last.x}
        cy={last.y}
        r="3.5"
        fill="var(--color-signal)"
        stroke="var(--color-panel-to)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
