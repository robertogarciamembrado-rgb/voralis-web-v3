"use client";

/**
 * Formulario de contacto de Voralis.
 *
 * Campos: nombre, organización, correo, motivo (select), mensaje (textarea),
 * acepta_privacidad (obligatorio), acepta_comunicaciones (opcional).
 *
 * Envío: POST vía `enviarMensajeContacto` (src/lib/contacto.ts).
 *
 * Precarga desde URL: /contacto?motivo=<valor> preselecciona el motivo.
 * Con motivo=pulse (lista de espera de Voralis Pulse) el mensaje es opcional
 * y la confirmación es propia.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { enviarMensajeContacto } from "@/lib/contacto";
import { revealConfirmation } from "@/lib/scroll";
import { Link } from "@/i18n/routing";

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

function RequiredMark({ children }: { children: string }) {
  return (
    <span className="ml-1 font-normal text-fg/60" aria-hidden="true">
      {children}
    </span>
  );
}

// ── Tipos ──────────────────────────────────────────────────────────────────

type FormErrors = {
  nombre?: string;
  organizacion?: string;
  correo?: string;
  motivo?: string;
  mensaje?: string;
  acepta_privacidad?: string;
  submit?: string;
};

type ReasonOption = { value: string; label: string };

// ── Componente ─────────────────────────────────────────────────────────────

export function ContactoForm({ defaultMotivo }: { defaultMotivo?: string }) {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  const reasons = t.raw("reasons") as ReasonOption[];

  const [motivo, setMotivo] = useState(defaultMotivo ?? "");
  const isPulse = motivo === "pulse";
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const nombreRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const motivoRef = useRef<HTMLSelectElement>(null);
  const mensajeRef = useRef<HTMLTextAreaElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);
  const comunicacionesRef = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const confirmationTitleRef = useRef<HTMLParagraphElement>(null);

  // Al confirmar: deja la confirmación visible bajo la cabecera y lleva el foco al título.
  useEffect(() => {
    if (sent) revealConfirmation(confirmationRef.current, confirmationTitleRef.current);
  }, [sent]);

  // ── Validación ────────────────────────────────────────────────────────────

  function validate(): FormErrors {
    const e: FormErrors = {};

    if (!nombreRef.current?.value.trim()) e.nombre = t("errors.required");
    if (!orgRef.current?.value.trim()) e.organizacion = t("errors.required");

    const correoVal = correoRef.current?.value ?? "";
    if (!correoVal.trim()) e.correo = t("errors.required");
    else if (!isValidEmail(correoVal)) e.correo = t("errors.email");

    if (!motivoRef.current?.value) e.motivo = t("errors.required");
    if (!isPulse && !mensajeRef.current?.value.trim()) e.mensaje = t("errors.required");
    if (!privacyRef.current?.checked) e.acepta_privacidad = t("errors.privacy");

    return e;
  }

  function focusFirst(e: FormErrors) {
    if (e.nombre) { nombreRef.current?.focus(); return; }
    if (e.organizacion) { orgRef.current?.focus(); return; }
    if (e.correo) { correoRef.current?.focus(); return; }
    if (e.motivo) { motivoRef.current?.focus(); return; }
    if (e.mensaje) { mensajeRef.current?.focus(); return; }
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
      const result = await enviarMensajeContacto({
        nombre: nombreRef.current!.value.trim(),
        organizacion: orgRef.current!.value.trim(),
        correo: correoRef.current!.value.trim(),
        motivo: motivoRef.current!.value,
        mensaje: mensajeRef.current!.value.trim(),
        acepta_privacidad: true,
        acepta_comunicaciones: comunicacionesRef.current?.checked ?? false,
        origen: "landing",
        enviado_el: new Date().toISOString(),
        idioma_navegador: navigator.language,
      });
      if (result.ok) {
        setSent(true);
      } else {
        setErrors({ submit: t("errorFallback") });
      }
    } catch {
      setErrors({ submit: t("errorFallback") });
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
        className="max-w-xl scroll-mt-28 rounded-card border border-signal/30 bg-signal/10 p-6"
      >
        <p
          ref={confirmationTitleRef}
          tabIndex={-1}
          className="text-2xl font-bold text-fg outline-none"
        >
          {t("confirmation.title")}
        </p>
        <p className="mt-2 text-[1.0625rem] leading-relaxed text-fg/80">
          {isPulse ? t("confirmation.textPulse") : t("confirmation.text")}
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
      className="flex max-w-xl flex-col gap-5"
    >
      {/* Nombre */}
      <div>
        <label htmlFor="ct-nombre" className={labelCls}>
          {t("fields.nombre")}
          <RequiredMark>{tCommon("requiredMark")}</RequiredMark>
        </label>
        <input
          ref={nombreRef}
          id="ct-nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          aria-describedby={errors.nombre ? "ct-nombre-error" : undefined}
          aria-invalid={errors.nombre ? "true" : undefined}
          className={cn(inputBase, errors.nombre && inputErr)}
        />
        {errors.nombre && (
          <p id="ct-nombre-error" role="alert" aria-live="polite" className={errorText}>
            {errors.nombre}
          </p>
        )}
      </div>

      {/* Organización */}
      <div>
        <label htmlFor="ct-org" className={labelCls}>
          {t("fields.organizacion")}
          <RequiredMark>{tCommon("requiredMark")}</RequiredMark>
        </label>
        <input
          ref={orgRef}
          id="ct-org"
          name="organizacion"
          type="text"
          autoComplete="organization"
          aria-describedby={errors.organizacion ? "ct-org-error" : undefined}
          aria-invalid={errors.organizacion ? "true" : undefined}
          className={cn(inputBase, errors.organizacion && inputErr)}
        />
        {errors.organizacion && (
          <p id="ct-org-error" role="alert" aria-live="polite" className={errorText}>
            {errors.organizacion}
          </p>
        )}
      </div>

      {/* Correo */}
      <div>
        <label htmlFor="ct-correo" className={labelCls}>
          {t("fields.correo")}
          <RequiredMark>{tCommon("requiredMark")}</RequiredMark>
        </label>
        <input
          ref={correoRef}
          id="ct-correo"
          name="correo"
          type="email"
          autoComplete="email"
          aria-describedby={errors.correo ? "ct-correo-error" : undefined}
          aria-invalid={errors.correo ? "true" : undefined}
          className={cn(inputBase, errors.correo && inputErr)}
        />
        {errors.correo && (
          <p id="ct-correo-error" role="alert" aria-live="polite" className={errorText}>
            {errors.correo}
          </p>
        )}
      </div>

      {/* Motivo */}
      <div>
        <label htmlFor="ct-motivo" className={labelCls}>
          {t("fields.motivo")}
          <RequiredMark>{tCommon("requiredMark")}</RequiredMark>
        </label>
        <select
          ref={motivoRef}
          id="ct-motivo"
          name="motivo"
          value={motivo}
          onChange={(ev) => setMotivo(ev.target.value)}
          aria-describedby={errors.motivo ? "ct-motivo-error" : undefined}
          aria-invalid={errors.motivo ? "true" : undefined}
          className={cn(inputBase, errors.motivo && inputErr)}
        >
          <option value="" disabled>
            {tCommon("selectOption")}
          </option>
          {reasons.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.motivo && (
          <p id="ct-motivo-error" role="alert" aria-live="polite" className={errorText}>
            {errors.motivo}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="ct-mensaje" className={labelCls}>
          {t("fields.mensaje")}
          {!isPulse && <RequiredMark>{tCommon("requiredMark")}</RequiredMark>}
        </label>
        {isPulse && (
          <p id="ct-mensaje-help" className="mt-1 text-sm text-fg/60">
            {t("mensajePulseHelp")}
          </p>
        )}
        <textarea
          ref={mensajeRef}
          id="ct-mensaje"
          name="mensaje"
          rows={5}
          aria-describedby={cn(isPulse && "ct-mensaje-help", errors.mensaje && "ct-mensaje-error")}
          aria-invalid={errors.mensaje ? "true" : undefined}
          className={cn(inputBase, errors.mensaje && inputErr)}
        />
        {errors.mensaje && (
          <p id="ct-mensaje-error" role="alert" aria-live="polite" className={errorText}>
            {errors.mensaje}
          </p>
        )}
      </div>

      {/* Política de privacidad (obligatoria) */}
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={privacyRef}
            id="ct-privacidad"
            name="acepta_privacidad"
            type="checkbox"
            aria-labelledby="ct-privacidad-label"
            aria-describedby={errors.acepta_privacidad ? "ct-privacidad-error" : undefined}
            aria-invalid={errors.acepta_privacidad ? "true" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
          />
          <label
            htmlFor="ct-privacidad"
            className="cursor-pointer text-sm leading-relaxed text-fg"
          >
            <span id="ct-privacidad-label">
              {t("consent.privacyPrefix")}
              <Link
                href={t("consent.privacyLinkHref")}
                className="underline hover:text-accent"
                onClick={(ev) => ev.stopPropagation()}
              >
                {t("consent.privacyLinkText")}
              </Link>
              {t("consent.privacySuffix")}{" "}
              <span className="font-semibold">{tCommon("requiredMark")}</span>
            </span>
          </label>
        </div>
        {errors.acepta_privacidad && (
          <p
            id="ct-privacidad-error"
            role="alert"
            aria-live="polite"
            className={cn(errorText, "mt-2")}
          >
            {errors.acepta_privacidad}
          </p>
        )}
      </div>

      {/* Comunicaciones comerciales (opcional) */}
      <div className="flex items-start gap-3">
        <input
          ref={comunicacionesRef}
          id="ct-comunicaciones"
          name="acepta_comunicaciones"
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
        />
        <label
          htmlFor="ct-comunicaciones"
          className="cursor-pointer text-sm leading-relaxed text-fg"
        >
          {t("consent.communications")}
        </label>
      </div>

      {/* Error global de envío */}
      {errors.submit && (
        <p role="alert" aria-live="polite" className="text-sm text-red-600">
          {errors.submit}
        </p>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={sending}
        className={cn(
          "inline-flex self-start items-center justify-center gap-2 rounded-xl",
          "px-[1.375rem] py-[0.9375rem] text-[0.9375rem] font-bold text-white",
          "bg-accent shadow-brand transition-[background-color] duration-300",
          "hover:bg-accent-hover",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {sending ? t("submitting") : `${t("submit")} →`}
      </button>
    </form>
  );
}
