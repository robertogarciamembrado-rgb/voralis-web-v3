"use client";

/**
 * Formulario de solicitud de alta de Voralis Vigilante.
 *
 * Campos (en orden): web, tipo de organización, nombre y apellidos, cargo,
 * correo, teléfono, competidores (hasta 3), prioridades, plan (hidden),
 * acepta_privacidad (obligatorio), acepta_comunicaciones (opcional).
 *
 * Envío: POST vía `enviarSolicitudAlta` (src/lib/solicitar-alta.ts).
 * Las solicitudes entran en estado "pendiente_revision"; el análisis lo
 * lanza el equipo de Voralis manualmente tras revisar la solicitud.
 */

import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { enviarSolicitudAlta } from "@/lib/solicitar-alta";
import { isValidWebUrl, normalizeUrl } from "@/lib/url";
import { revealConfirmation } from "@/lib/scroll";
import { signup } from "@/content/pages";

// ── Helpers ────────────────────────────────────────────────────────────────

function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

// ── Estilos compartidos ────────────────────────────────────────────────────

const inputBase =
  "mt-1.5 w-full rounded-xl border border-line bg-raised px-4 py-3 " +
  "text-[0.9375rem] text-fg focus:border-accent focus:outline-none " +
  "focus:ring-2 focus:ring-accent/30 transition-[border-color,box-shadow] duration-200";

const inputErr = "border-red-500 focus:border-red-500 focus:ring-red-500/30";
const errorText = "mt-1 text-sm text-red-600";
const labelCls = "block text-sm font-bold text-fg";

function RequiredMark() {
  return (
    <span className="ml-1 font-normal text-fg/60" aria-hidden="true">
      (obligatorio)
    </span>
  );
}

// ── Tipos de errores ────────────────────────────────────────────────────────

type FormErrors = {
  web?: string;
  tipo?: string;
  nombre?: string;
  cargo?: string;
  correo?: string;
  competidores?: (string | undefined)[];
  acepta_privacidad?: string;
  submit?: string;
};

// ── Componente ──────────────────────────────────────────────────────────────

export function SolicitudAltaForm({
  plan,
}: {
  plan?: "profesional" | "observatorio";
}) {
  const [competidores, setCompetidores] = useState<string[]>([""]);
  const [prioridades, setPrioridades] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // refs para lectura de valores y foco en primer error
  const webRef = useRef<HTMLInputElement>(null);
  const tipoRef = useRef<HTMLSelectElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const cargoRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);
  const comunicacionesRef = useRef<HTMLInputElement>(null);
  const compRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const confirmationTitleRef = useRef<HTMLParagraphElement>(null);

  // Al confirmar: deja la confirmación visible bajo la cabecera y lleva el foco al título.
  useEffect(() => {
    if (sent) revealConfirmation(confirmationRef.current, confirmationTitleRef.current);
  }, [sent]);

  // ── Validación ────────────────────────────────────────────────────────────

  function validate(): FormErrors {
    const e: FormErrors = {};

    const webVal = webRef.current?.value ?? "";
    if (!webVal.trim()) e.web = signup.errors.required;
    else if (!isValidWebUrl(webVal)) e.web = signup.errors.url;

    if (!tipoRef.current?.value) e.tipo = signup.errors.required;
    if (!nombreRef.current?.value.trim()) e.nombre = signup.errors.required;
    if (!cargoRef.current?.value.trim()) e.cargo = signup.errors.required;

    const correoVal = correoRef.current?.value ?? "";
    if (!correoVal.trim()) e.correo = signup.errors.required;
    else if (!isValidEmail(correoVal)) e.correo = signup.errors.email;

    const compErrors = competidores.map((c) =>
      c.trim() && !isValidWebUrl(c) ? signup.errors.url : undefined,
    );
    if (compErrors.some(Boolean)) e.competidores = compErrors;

    if (!privacyRef.current?.checked) e.acepta_privacidad = signup.errors.privacy;

    return e;
  }

  function focusFirst(e: FormErrors) {
    if (e.web) { webRef.current?.focus(); return; }
    if (e.tipo) { tipoRef.current?.focus(); return; }
    if (e.nombre) { nombreRef.current?.focus(); return; }
    if (e.cargo) { cargoRef.current?.focus(); return; }
    if (e.correo) { correoRef.current?.focus(); return; }
    if (e.competidores) {
      const idx = e.competidores.findIndex(Boolean);
      if (idx >= 0) compRefs.current[idx]?.focus();
      return;
    }
    if (e.acepta_privacidad) privacyRef.current?.focus();
  }

  // ── Envío ─────────────────────────────────────────────────────────────────

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      focusFirst(errs);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const result = await enviarSolicitudAlta({
        web: normalizeUrl(webRef.current!.value),
        tipo_organizacion: tipoRef.current!.value,
        nombre: nombreRef.current!.value.trim(),
        cargo: cargoRef.current!.value.trim(),
        correo: correoRef.current!.value.trim(),
        telefono: telefonoRef.current?.value.trim() || undefined,
        competidores: competidores.map(normalizeUrl).filter(Boolean),
        prioridades: prioridades.trim() || undefined,
        plan,
        acepta_privacidad: true,
        acepta_comunicaciones: comunicacionesRef.current?.checked ?? false,
        origen: "landing",
        estado: "pendiente_revision",
        enviada_el: new Date().toISOString(),
        idioma_navegador: navigator.language,
      });
      if (result.ok) {
        setSent(true);
      } else {
        setErrors({ submit: signup.errorFallback });
      }
    } catch {
      setErrors({ submit: signup.errorFallback });
    } finally {
      setSending(false);
    }
  }

  // ── Confirmación ──────────────────────────────────────────────────────────

  if (sent) {
    return (
      <div
        ref={confirmationRef}
        role="status"
        className="max-w-xl scroll-mt-28 rounded-2xl border border-signal/30 bg-signal/10 p-8"
      >
        <p
          ref={confirmationTitleRef}
          tabIndex={-1}
          className="text-2xl font-bold text-fg outline-none"
        >
          {signup.confirmation.title}
        </p>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg/80">
          {signup.confirmation.text}
        </p>
      </div>
    );
  }

  // ── Formulario ────────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={onSubmit}
      method="post"
      noValidate
      className="flex max-w-xl flex-col gap-6"
    >
      {/* Campo oculto: plan */}
      {plan && <input type="hidden" name="plan" value={plan} />}

      {/* 1. Web */}
      <div>
        <label htmlFor="alta-web" className={labelCls}>
          {signup.fields.web.label}
          <RequiredMark />
        </label>
        <p id="alta-web-help" className="mt-1 text-sm text-fg/60">
          {signup.fields.web.help}
        </p>
        <input
          ref={webRef}
          id="alta-web"
          name="web"
          type="text"
          inputMode="url"
          autoComplete="url"
          aria-describedby={cn("alta-web-help", errors.web && "alta-web-error")}
          aria-invalid={errors.web ? "true" : undefined}
          className={cn(inputBase, errors.web && inputErr)}
        />
        {errors.web && (
          <p id="alta-web-error" role="alert" aria-live="polite" className={errorText}>
            {errors.web}
          </p>
        )}
      </div>

      {/* 2. Tipo de organización */}
      <div>
        <label htmlFor="alta-tipo" className={labelCls}>
          {signup.fields.tipo.label}
          <RequiredMark />
        </label>
        <select
          ref={tipoRef}
          id="alta-tipo"
          name="tipo_organizacion"
          defaultValue=""
          aria-describedby={errors.tipo ? "alta-tipo-error" : undefined}
          aria-invalid={errors.tipo ? "true" : undefined}
          className={cn(inputBase, errors.tipo && inputErr)}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          {signup.tiposOrganizacion.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.tipo && (
          <p id="alta-tipo-error" role="alert" aria-live="polite" className={errorText}>
            {errors.tipo}
          </p>
        )}
      </div>

      {/* 3. Nombre y apellidos */}
      <div>
        <label htmlFor="alta-nombre" className={labelCls}>
          {signup.fields.nombre.label}
          <RequiredMark />
        </label>
        <input
          ref={nombreRef}
          id="alta-nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          aria-describedby={errors.nombre ? "alta-nombre-error" : undefined}
          aria-invalid={errors.nombre ? "true" : undefined}
          className={cn(inputBase, errors.nombre && inputErr)}
        />
        {errors.nombre && (
          <p id="alta-nombre-error" role="alert" aria-live="polite" className={errorText}>
            {errors.nombre}
          </p>
        )}
      </div>

      {/* 4. Cargo */}
      <div>
        <label htmlFor="alta-cargo" className={labelCls}>
          {signup.fields.cargo.label}
          <RequiredMark />
        </label>
        <input
          ref={cargoRef}
          id="alta-cargo"
          name="cargo"
          type="text"
          autoComplete="organization-title"
          aria-describedby={errors.cargo ? "alta-cargo-error" : undefined}
          aria-invalid={errors.cargo ? "true" : undefined}
          className={cn(inputBase, errors.cargo && inputErr)}
        />
        {errors.cargo && (
          <p id="alta-cargo-error" role="alert" aria-live="polite" className={errorText}>
            {errors.cargo}
          </p>
        )}
      </div>

      {/* 5. Correo electrónico */}
      <div>
        <label htmlFor="alta-correo" className={labelCls}>
          {signup.fields.correo.label}
          <RequiredMark />
        </label>
        <input
          ref={correoRef}
          id="alta-correo"
          name="correo"
          type="email"
          autoComplete="email"
          aria-describedby={errors.correo ? "alta-correo-error" : undefined}
          aria-invalid={errors.correo ? "true" : undefined}
          className={cn(inputBase, errors.correo && inputErr)}
        />
        {errors.correo && (
          <p id="alta-correo-error" role="alert" aria-live="polite" className={errorText}>
            {errors.correo}
          </p>
        )}
      </div>

      {/* 6. Teléfono (opcional) */}
      <div>
        <label htmlFor="alta-telefono" className={labelCls}>
          {signup.fields.telefono.label}
        </label>
        <input
          ref={telefonoRef}
          id="alta-telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          className={inputBase}
        />
      </div>

      {/* 7. Competidores o referentes (hasta 3, opcionales) */}
      <fieldset>
        <legend className={cn(labelCls, "mb-1")}>
          {signup.fields.competidores.label}
        </legend>
        <p id="alta-comp-help" className="mb-3 text-sm text-fg/60">
          {signup.fields.competidores.help}
        </p>
        <div className="flex flex-col gap-3">
          {competidores.map((val, i) => (
            <div key={i}>
              <label htmlFor={`alta-comp-${i}`} className="sr-only">
                {signup.fields.competidores.label} {i + 1}
              </label>
              <input
                ref={(el) => {
                  compRefs.current[i] = el;
                }}
                id={`alta-comp-${i}`}
                type="text"
                inputMode="url"
                value={val}
                onChange={(ev) => {
                  const next = [...competidores];
                  next[i] = ev.target.value;
                  setCompetidores(next);
                }}
                aria-describedby={cn(
                  "alta-comp-help",
                  errors.competidores?.[i] && `alta-comp-${i}-error`,
                )}
                aria-invalid={errors.competidores?.[i] ? "true" : undefined}
                className={cn(inputBase, errors.competidores?.[i] && inputErr)}
              />
              {errors.competidores?.[i] && (
                <p
                  id={`alta-comp-${i}-error`}
                  role="alert"
                  aria-live="polite"
                  className={errorText}
                >
                  {errors.competidores[i]}
                </p>
              )}
            </div>
          ))}
        </div>
        {competidores.length < 3 && (
          <button
            type="button"
            onClick={() => setCompetidores([...competidores, ""])}
            className="mt-3 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            + {signup.fields.competidores.addButton}
          </button>
        )}
      </fieldset>

      {/* 8. Prioridades (opcional, máx. 500 caracteres) */}
      <div>
        <label htmlFor="alta-prioridades" className={labelCls}>
          {signup.fields.prioridades.label}
        </label>
        <textarea
          id="alta-prioridades"
          name="prioridades"
          rows={3}
          maxLength={signup.fields.prioridades.maxLength}
          value={prioridades}
          onChange={(ev) => setPrioridades(ev.target.value)}
          aria-describedby="alta-prioridades-counter"
          className={inputBase}
        />
        <p
          id="alta-prioridades-counter"
          className="mt-1 text-right text-xs text-fg/50"
          aria-live="polite"
        >
          {prioridades.length} / {signup.fields.prioridades.maxLength}
        </p>
      </div>

      {/* 10. Política de privacidad (obligatoria) */}
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={privacyRef}
            id="alta-privacidad"
            name="acepta_privacidad"
            type="checkbox"
            aria-labelledby="alta-privacidad-label"
            aria-describedby={errors.acepta_privacidad ? "alta-privacidad-error" : undefined}
            aria-invalid={errors.acepta_privacidad ? "true" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
          />
          <label
            htmlFor="alta-privacidad"
            className="cursor-pointer text-sm leading-relaxed text-fg"
          >
            <span id="alta-privacidad-label">
              {signup.consent.privacyPrefix}
              <Link
                href={signup.consent.privacyLinkHref}
                className="underline hover:text-accent"
                onClick={(ev) => ev.stopPropagation()}
              >
                {signup.consent.privacyLinkText}
              </Link>
              {signup.consent.privacySuffix}{" "}
              <span className="font-semibold">(obligatorio)</span>
            </span>
          </label>
        </div>
        {errors.acepta_privacidad && (
          <p
            id="alta-privacidad-error"
            role="alert"
            aria-live="polite"
            className={cn(errorText, "mt-2")}
          >
            {errors.acepta_privacidad}
          </p>
        )}
      </div>

      {/* 11. Comunicaciones comerciales (opcional) */}
      <div className="flex items-start gap-3">
        <input
          ref={comunicacionesRef}
          id="alta-comunicaciones"
          name="acepta_comunicaciones"
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
        />
        <label
          htmlFor="alta-comunicaciones"
          className="cursor-pointer text-sm leading-relaxed text-fg"
        >
          {signup.consent.communications}
        </label>
      </div>

      {/* Error global de envío */}
      {errors.submit && (
        <p role="alert" aria-live="polite" className="text-sm text-red-600">
          {errors.submit}
        </p>
      )}

      {/* Botón y nota */}
      <div>
        <button
          type="submit"
          disabled={sending}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl",
            "px-[1.375rem] py-[0.9375rem] text-[0.9375rem] font-bold text-white",
            "bg-accent shadow-brand transition-[background-color] duration-300",
            "hover:bg-accent-hover",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {sending ? signup.submitting : `${signup.submit} →`}
        </button>
        <p className="mt-3 text-sm text-fg/60">{signup.note}</p>
      </div>
    </form>
  );
}
