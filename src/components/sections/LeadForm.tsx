"use client";

import { useState, type FormEvent } from "react";

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  options?: readonly string[];
  defaultValue?: string;
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-raised px-4 py-3 text-[0.9375rem] text-fg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

/**
 * Formulario simple con confirmación en pantalla.
 * Pendiente: conectar `onSubmit` con el backend / correo de ventas; hoy no se
 * envía ningún dato, solo se muestra la confirmación.
 */
export function LeadForm({
  fields,
  submitLabel,
  confirmation,
}: {
  fields: readonly Field[];
  submitLabel: string;
  confirmation: string;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p
        role="status"
        className="rounded-card border border-signal/30 bg-signal/10 p-6 text-[1.0625rem] font-semibold leading-relaxed text-fg"
      >
        {confirmation}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-5">
      {fields.map((f) => (
        <label key={f.name} className="block text-sm font-bold text-fg">
          {f.label}
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              required={f.required}
              rows={5}
              defaultValue={f.defaultValue}
              className={inputClass}
            />
          ) : f.type === "select" ? (
            <select
              name={f.name}
              required={f.required}
              defaultValue={f.defaultValue ?? ""}
              className={inputClass}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              className={inputClass}
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-accent px-[1.375rem] py-[0.9375rem] text-[0.9375rem] font-bold text-white shadow-brand transition-colors duration-300 hover:bg-accent-hover"
      >
        {submitLabel} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
