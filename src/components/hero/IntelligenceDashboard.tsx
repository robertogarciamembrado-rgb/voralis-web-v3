import { heroDashboard } from "@/content/home";
import { cn } from "@/lib/cn";
import { Sparkline } from "./Sparkline";

const impactTones = {
  high: { bar: "bg-alert", dot: "bg-alert" },
  mid: { bar: "bg-brand-400", dot: "bg-brand-400" },
  low: { bar: "bg-signal", dot: "bg-signal" },
} as const;

type ImpactTone = keyof typeof impactTones;

/* Orden de mayor a menor impacto: desempata el nivel dominante. */
const impactRank: Record<ImpactTone, number> = { high: 0, mid: 1, low: 2 };
const impactName: Record<ImpactTone, string> = { high: "ALTO", mid: "MEDIO", low: "BAJO" };

/** Porcentajes enteros que suman 100 (método del mayor resto). */
function roundedShares(values: readonly number[]): number[] {
  const total = values.reduce((a, b) => a + b, 0);
  const exact = values.map((v) => (v / total) * 100);
  const result = exact.map(Math.floor);
  let missing = 100 - result.reduce((a, b) => a + b, 0);
  exact
    .map((x, i) => ({ i, rem: x - Math.floor(x) }))
    .sort((a, b) => b.rem - a.rem)
    .forEach(({ i }) => {
      if (missing-- > 0) result[i] += 1;
    });
  return result;
}

/**
 * Visual del hero (brief §7): réplica del RADAR ESTRATÉGICO, la pantalla de
 * entrada real del producto.
 *
 * **Siempre en español.** Este componente reproduce el dashboard real del
 * cliente Tourism & Society Think Tank como demo: nombres de secciones,
 * niveles de impacto y labels de KPIs son parte del producto del cliente,
 * no chrome traducible de la web. Cambiar el locale de la web (a `/en`)
 * NO traduce este panel, igual que no traduce el logo del cliente dentro
 * del panel.
 *
 * Decisiones:
 * - Superficie oscura en los dos temas: representa una pantalla de producto,
 *   no un bloque de la web. Si se aclarase en tema claro perdería esa lectura.
 * - Server Component sin estado: todo el movimiento es CSS y el hero no envía
 *   JavaScript al navegador.
 * - Border beam en el marco: es la única pieza de la página que recibe el
 *   trazo animado, porque es donde debe caer la mirada al entrar.
 *
 * Datos del cliente (`heroDashboard` en `@/content/home`): textos fijos en
 * español (nombre del cliente, navegación interna del producto, fecha de
 * exportación, etiquetas de actividad, sectores en tendencia, reparto de
 * impacto). El resto del hero SÍ se traduce vía `messages/{locale}.json`.
 */
export function IntelligenceDashboard({ className }: { className?: string }) {
  const d = heroDashboard;
  const impactTotal = d.impactMix.reduce((sum, item) => sum + item.value, 0);

  /* Nivel de impacto dominante: el de más piezas; si hay empate, el más alto. */
  const dominant =
    impactTotal > 0
      ? [...d.impactMix].sort(
          (a, b) =>
            b.value - a.value ||
            impactRank[a.tone as ImpactTone] - impactRank[b.tone as ImpactTone],
        )[0]
      : null;

  /* El reparto se calcula sobre las mismas piezas que «Información relevante»:
     si no suman lo mismo, el gráfico se oculta en lugar de mostrar cifras que no cuadran. */
  // TODO: pendiente de la exportación corregida de demo.json
  const showImpactMix = impactTotal === d.relevantTotal;
  const impactShares = showImpactMix ? roundedShares(d.impactMix.map((i) => i.value)) : [];

  return (
    <div className={cn("relative", className)}>
      {/* Halo difuso detrás del panel — profundidad sin sombra dura */}
      <div
        aria-hidden="true"
        className="glow-brand absolute inset-x-6 -bottom-6 top-10 -z-10 rounded-[2rem] blur-3xl"
      />

      {/* Marco: separa el panel de producto del fondo de la página */}
      <div className="border-beam animate-rise relative rounded-panel border border-[var(--v-panel-ring)] bg-raised/70 p-2.5 shadow-panel backdrop-blur-sm">
        <div className="panel-surface relative overflow-hidden rounded-[1.125rem]">
          {/* Anillos de radar: refuerzan la idea de vigilancia del entorno */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full border border-brand-300/25 shadow-[0_0_0_2.25rem_rgba(161,215,255,0.06),0_0_0_4.5rem_rgba(161,215,255,0.04)]"
          />

          {/* ---- Cabecera --------------------------------------------- */}
          <div className="relative border-b border-white/10 px-4 py-3.5 sm:px-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.14em] text-brand-200">
                  {d.client}
                </p>
                <p className="mt-1 text-[1rem] font-extrabold tracking-[-0.03em] text-white">
                  {d.title}
                </p>
              </div>
              <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-signal">
                {d.sampleLabel}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
              {/* Selector temporal de la especificación funcional §6 */}
              <div className="flex flex-wrap items-center gap-1 rounded-lg bg-white/[0.06] p-0.5">
                {d.navigation.map((item, index) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-md px-2 py-1 text-[0.6875rem] font-bold",
                      index === 0
                        ? "bg-white/15 text-white"
                        : "text-panel-muted",
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Semáforo de frescura: verde por debajo de 15 min */}
              <span className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-panel-muted">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-signal animate-signal-pulse"
                />
                {d.freshness.label}
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-3 p-4 sm:p-5">
            {/* ---- KPIs ejecutivos ------------------------------------ */}
            <ul className="grid grid-cols-2 gap-2.5">
              <Kpi label="Información relevante" value={String(d.relevantTotal)} />
              <Kpi label="Ejes activos" value={String(d.activeAxes)} />
              {dominant ? (
                <Kpi
                  label="Impacto medio del periodo"
                  value={impactName[dominant.tone as ImpactTone]}
                  className="col-span-2"
                />
              ) : null}
            </ul>

            {/* ---- Actividad informativa ------------------------------ */}
            <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-panel-muted">
                    {d.activity.label}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] font-semibold text-white/90">
                    {d.activity.caption}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-white">
                <Sparkline
                  series={d.activity.series}
                  label={`${d.activity.label}, ${d.activity.caption}: tendencia creciente`}
                />
              </div>

              {/* Tendencias en auge, compactas bajo la curva */}
              <ul className="mt-3 flex flex-col gap-1.5 border-t border-white/10 pt-3">
                <li className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-panel-muted">
                  {d.trending.label}
                </li>
                {d.trending.items.map((topic) => (
                  <li
                    key={topic.name}
                    className="flex items-center justify-between gap-3 text-[0.8125rem]"
                  >
                    <span className="truncate text-white/85">{topic.name}</span>
                    <span className="tabular shrink-0 font-extrabold text-signal">
                      {topic.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---- Reparto de impacto --------------------------------- */}
            {showImpactMix ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-panel-muted">
                Impacto de la información
              </p>

              {/* Barra apilada: proporción de un vistazo, cifras debajo */}
              <div
                className="mt-2.5 flex h-2 overflow-hidden rounded-full bg-white/10"
                role="img"
                aria-label={d.impactMix
                  .map((item, i) => `${impactShares[i]} % de impacto ${item.label.toLowerCase()}`)
                  .join(", ")}
              >
                {d.impactMix.map((item) => (
                  <span
                    key={item.label}
                    className={cn("h-full", impactTones[item.tone as ImpactTone].bar)}
                    style={{ width: `${(item.value / impactTotal) * 100}%` }}
                  />
                ))}
              </div>

              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {d.impactMix.map((item, i) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-1.5 text-[0.75rem] text-white/85"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1.5 rounded-full",
                        impactTones[item.tone as ImpactTone].dot,
                      )}
                    />
                    <span className="text-panel-muted">{item.label}</span>
                    <span className="tabular font-extrabold">{impactShares[i]} %</span>
                  </li>
                ))}
              </ul>
            </div>
            ) : null}
          </div>

          {/* ---- Cierre: mensaje visual del hero --------------------- */}
          <p className="relative border-t border-white/10 px-5 py-3.5 text-center text-[0.8125rem] font-bold text-brand-200">
            {d.statement}
          </p>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <li className={cn("rounded-xl border border-white/10 bg-white/[0.045] p-3", className)}>
      <p className="text-[0.625rem] font-bold uppercase leading-tight tracking-[0.08em] text-panel-muted">
        {label}
      </p>
      <p className="tabular mt-1.5 text-2xl font-extrabold leading-none tracking-[-0.045em]">
        {value}
      </p>
    </li>
  );
}
