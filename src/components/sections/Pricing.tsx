"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { routes } from "@/content/site";

type Billing = "monthly" | "annual";
type Currency = "EUR" | "USD";

/** Convierte `**negrita**` del copy en <strong>. */
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-bold text-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

/** Sustituye cada `{cifra}` por el importe con el símbolo de la moneda elegida. */
function formatMoney(template: string, currency: Currency): string {
  return template.replace(/\{([\d.,]+)\}/g, (_, amount: string) =>
    currency === "EUR" ? `${amount} €` : `$${amount}`,
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-xl border border-line bg-raised p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-lg px-3.5 py-2 text-sm font-bold transition-colors duration-300",
            value === option.value ? "bg-accent text-white" : "text-fg-soft hover:text-accent",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
          <Check
            aria-hidden="true"
            className="mt-[0.2rem] size-4 shrink-0 text-accent"
            strokeWidth={2.75}
          />
          <span>{rich(item)}</span>
        </li>
      ))}
    </ul>
  );
}

type Plan = {
  name: string;
  price?: string;
  audience: string;
  features: string[];
  badge?: string;
  monthly?: { amount: string; unit: string };
  annual?: { amount: string; unit: string };
  fineprint?: string;
  priceObj?: { prefix: string; amount: string; unit: string };
  note?: string;
};

/**
 * 6 · PLANES — se monta solo si NEXT_PUBLIC_SHOW_PRICING está activo (page.tsx).
 * Isla de cliente: únicamente gestiona los selectores EUR / USD y Mensual / Anual.
 */
export function Pricing() {
  const t = useTranslations("Pricing");
  const tActions = useTranslations("Actions");

  const explorer = t.raw("plans.explorer") as Plan;
  const professional = t.raw("plans.professional") as Plan;
  const observatory = t.raw("plans.observatory") as Plan;
  const credit = t.raw("credit") as { title: string; body: string };
  const addons = t.raw("addons") as {
    title: string;
    items: Array<{ name: string; price: string }>;
    fineprint: string;
  };

  const [currency, setCurrency] = useState<Currency>("EUR");
  const [billing, setBilling] = useState<Billing>("monthly");

  const money = (template: string) => formatMoney(template, currency);
  const pro = billing === "monthly" ? professional.monthly! : professional.annual!;
  const billingLabel = t("selectors.billing.label");
  const billingOptions = [
    { value: "monthly" as const, label: t("selectors.billing.monthly") },
    { value: "annual" as const, label: t("selectors.billing.annual") },
  ];
  const currencyOptions = [
    { value: "EUR" as const, label: "EUR" },
    { value: "USD" as const, label: "USD" },
  ];

  return (
    <Section id="planes" labelledBy="planes-title">
      <SectionHeading id="planes-title">{t("headline")}</SectionHeading>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Segmented
          label={billingLabel}
          value={billing}
          onChange={setBilling}
          options={billingOptions}
        />
        <Segmented
          label={t("selectors.currency.label")}
          value={currency}
          onChange={setCurrency}
          options={currencyOptions}
        />
        <p className="text-xs text-muted">{t("monthlyAnnualHint")}</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* ---- Explorador ------------------------------------------- */}
        <article className="card-surface flex h-full flex-col p-7 sm:p-8">
          <h3 className="text-xl font-bold tracking-[-0.03em] text-fg">{explorer.name}</h3>
          <p className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-fg">{explorer.price}</p>
          <p className="mt-3 text-[0.9375rem] italic leading-relaxed text-muted">{explorer.audience}</p>
          <FeatureList items={explorer.features} />
          <div className="mt-auto pt-8">
            <Button href={routes.demo} variant="secondary">
              {tActions("viewDemo")}
            </Button>
          </div>
        </article>

        {/* ---- Profesional (recomendado) ---------------------------- */}
        <article className="card-surface border-beam flex h-full flex-col p-7 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-bold tracking-[-0.03em] text-fg">{professional.name}</h3>
            <span className="rounded-full bg-accent px-2.5 py-1 text-[0.625rem] font-extrabold uppercase tracking-wider text-white">
              {professional.badge}
            </span>
          </div>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
            <span className="tabular text-3xl font-extrabold tracking-[-0.045em] text-fg">
              {money(`{${pro.amount}}`)}
            </span>
            <span className="text-base font-bold text-muted">{pro.unit}</span>
          </p>
          <p className="mt-3 text-[0.9375rem] italic leading-relaxed text-muted">{professional.audience}</p>
          <FeatureList items={professional.features} />
          {professional.fineprint ? (
            <p className="mt-6 text-xs leading-relaxed text-muted">{money(professional.fineprint)}</p>
          ) : null}
          <div className="mt-auto pt-8">
            <Button href={routes.solicitarAlta} trailingArrow>
              {tActions("requestOnboarding")}
            </Button>
          </div>
        </article>

        {/* ---- Observatorio ----------------------------------------- */}
        <article className="card-surface flex h-full flex-col p-7 sm:p-8">
          <h3 className="text-xl font-bold tracking-[-0.03em] text-fg">{observatory.name}</h3>
          {observatory.priceObj ? (
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span className="text-base font-bold text-muted">{observatory.priceObj.prefix}</span>
              <span className="tabular text-3xl font-extrabold tracking-[-0.045em] text-fg">
                {money(`{${observatory.priceObj.amount}}`)}
              </span>
              <span className="text-base font-bold text-muted">{observatory.priceObj.unit}</span>
            </p>
          ) : null}
          <p className="mt-3 text-[0.9375rem] italic leading-relaxed text-muted">{observatory.audience}</p>
          <FeatureList items={observatory.features} />
          {observatory.note ? (
            <p className="mt-6 text-sm leading-relaxed text-fg-soft">{observatory.note}</p>
          ) : null}
          <div className="mt-auto pt-8">
            <Button href={routes.contacto} variant="secondary">
              {tActions("contactSales")}
            </Button>
          </div>
        </article>
      </div>

      {/* ---- Qué es un crédito ---------------------------------------- */}
      <div className="mt-4 rounded-card border border-line bg-sunken p-7 sm:p-8">
        <h3 className="text-lg font-bold tracking-[-0.03em] text-fg">{credit.title}</h3>
        <p className="mt-2 max-w-[48rem] text-[0.9375rem] leading-relaxed text-muted">
          {credit.body}
        </p>
      </div>

      {/* ---- Complementos --------------------------------------------- */}
      <div className="mt-12">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-fg">{addons.title}</h3>
        <dl className="mt-5 divide-y divide-line rounded-card border border-line bg-raised">
          {addons.items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <dt className="text-[0.9375rem] font-semibold text-fg">{item.name}</dt>
              <dd className="tabular text-[0.9375rem] text-muted sm:text-right">{money(item.price)}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-muted">{addons.fineprint}</p>
      </div>
    </Section>
  );
}
