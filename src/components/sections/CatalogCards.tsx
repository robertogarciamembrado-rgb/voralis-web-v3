"use client";

import { useState } from "react";
import { catalog } from "@/content/pages";
import { cn } from "@/lib/cn";

type Network = (typeof catalog.networks)[number];

/**
 * Tres tarjetas iguales, una por red, con banda de color y distintivo
 * «Disponible» / «Próximamente». Cualquier botón abre antes el aviso de salida.
 */
export function CatalogCards() {
  const [pending, setPending] = useState<Network | null>(null);

  return (
    <>
      <ul className="grid gap-4 lg:grid-cols-3">
        {catalog.networks.map((n) => (
          <li
            key={n.id}
            className="card-surface flex h-full flex-col overflow-hidden"
          >
            <div aria-hidden="true" className="h-1.5" style={{ backgroundColor: n.color }} />
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="grid h-11 min-w-11 place-items-center rounded-xl px-2 text-xs font-extrabold tracking-wider text-white"
                  style={{ backgroundColor: n.color }}
                >
                  {n.mark}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[0.625rem] font-extrabold uppercase tracking-wider",
                    n.available ? "bg-signal/15 text-signal-deep" : "bg-sunken text-muted",
                  )}
                >
                  {n.available ? catalog.badges.available : catalog.badges.soon}
                </span>
              </div>

              <h2 className="mt-5 text-lg font-bold tracking-[-0.03em] text-fg">{n.name}</h2>
              <p className="mt-1 text-base font-semibold text-fg-soft">{n.report}</p>

              <dl className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-muted">
                <div>
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.09em]">Qué vigila</dt>
                  <dd className="mt-0.5">{n.watches}</dd>
                </div>
                <div>
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.09em]">Para quién</dt>
                  <dd className="mt-0.5">{n.audience}</dd>
                </div>
                <div>
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.09em]">Ficha</dt>
                  <dd className="mt-0.5">
                    {n.summary} · {n.languages}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-sm font-semibold text-fg">{n.status}</p>

              <button
                type="button"
                onClick={() => setPending(n)}
                className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-xl bg-accent px-[1.125rem] py-[0.6875rem] text-sm font-bold text-white shadow-brand transition-colors duration-300 hover:bg-accent-hover"
                style={{ marginTop: "1.5rem" }}
              >
                {n.cta} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {pending ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-notice"
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onKeyDown={(e) => e.key === "Escape" && setPending(null)}
        >
          <div className="w-full max-w-md rounded-card border border-line bg-raised p-7 shadow-panel">
            <p id="exit-notice" className="text-[0.9375rem] leading-relaxed text-fg">
              {catalog.exitNotice(pending.name)}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={pending.href}
                target="_blank"
                rel="noopener noreferrer"
                autoFocus
                onClick={() => setPending(null)}
                className="inline-flex rounded-xl bg-accent px-[1.125rem] py-[0.6875rem] text-sm font-bold text-white hover:bg-accent-hover"
              >
                {catalog.exitActions.continue}
              </a>
              <button
                type="button"
                onClick={() => setPending(null)}
                className="inline-flex rounded-xl border border-line px-[1.125rem] py-[0.6875rem] text-sm font-bold text-fg hover:border-accent hover:text-accent"
              >
                {catalog.exitActions.cancel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
