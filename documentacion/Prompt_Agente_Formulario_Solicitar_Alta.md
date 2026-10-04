# Tarea: rehacer el formulario de `/solicitar-alta` de la landing de Voralis

## Contexto

Voralis Vigilante prepara una **radiografía** de cada cliente a partir de su web antes de la primera reunión. A partir de la web, el motor deduce:

- el sector y el nicho;
- palabras clave, ejes de vigilancia y fuentes;
- a quién vende, qué promete, sus fortalezas y limitaciones;
- su identidad visual.

Por eso el formulario **solo pide lo que el motor no puede deducir**, más los datos de contacto y los consentimientos. El idioma, la frecuencia y los destinatarios de los informes se acuerdan en la reunión, así que no van en el formulario.

**Revisión previa.** Las solicitudes no lanzan el análisis automáticamente: alguien del equipo de Voralis las revisa y lanza el análisis a mano. La web solo guarda la solicitud.

**Todavía no hay conexión con la plataforma.** No inventes endpoints. Deja el envío aislado en una función con un `TODO` para conectarla después a la API.

Todo el texto trata al visitante de **usted**.

## Alcance

- **Tocar:** la página `/solicitar-alta`, su componente de formulario, el archivo de contenido donde vivan sus textos (por ejemplo `src/content/`) y la función de envío.
- **Tocar también** el formulario de `/contacto`, solo para añadir las dos casillas de consentimiento y el envío por POST (ver el último apartado).
- **No tocar:** el resto de páginas, estilos globales, planes, catálogo ni demo.

Antes de editar, localiza los archivos actuales del formulario y reutiliza los componentes de campo, botón y estilos que ya existan en el proyecto.

## Campos del formulario

Sustituye los campos actuales (`nombre`, `organizacion`, `correo`, `vigilar`) por estos, en este orden:

| # | `name` | Etiqueta visible | Tipo | Obligatorio | Validación y ayuda |
|---|---|---|---|---|---|
| 1 | `web` | Web de su organización | `url` (input text con `inputMode="url"`) | Sí | Acepta dominio o URL de una página concreta. Si falta el protocolo, se añade `https://` al normalizar. Ayuda: «Puede ser la web principal o la página que mejor describa su organización o red.» |
| 2 | `tipo_organizacion` | Tipo de organización | `select` | Sí | Opciones en la lista de abajo. Primera opción deshabilitada: «Seleccione una opción». |
| 3 | `nombre` | Nombre y apellidos | `text` | Sí | `autoComplete="name"` |
| 4 | `cargo` | Cargo | `text` | Sí | `autoComplete="organization-title"` |
| 5 | `correo` | Correo electrónico | `email` | Sí | `autoComplete="email"`; validación de formato |
| 6 | `telefono` | Teléfono | `tel` | No | `autoComplete="tel"` |
| 7 | `competidores[]` | Competidores o referentes | hasta 3 campos URL | No | Un campo visible y botón «Añadir otro» hasta 3. Misma normalización que `web`. Ayuda: «Webs de organizaciones con las que se compara o que quiere seguir de cerca.» |
| 8 | `prioridades` | ¿Qué le gustaría vigilar o qué le preocupa? | `textarea` (3 filas) | No | Máximo 500 caracteres, con contador. |
| 9 | `plan` | — | `hidden` | — | Se rellena desde `?plan=` en la URL. Valores válidos: `profesional`, `observatorio`. Cualquier otro valor se ignora y queda vacío. |
| 10 | `acepta_privacidad` | (ver texto abajo) | `checkbox` sin marcar | Sí | No se puede enviar sin marcarla. |
| 11 | `acepta_comunicaciones` | (ver texto abajo) | `checkbox` sin marcar | No | Separada de la anterior y nunca premarcada. |

Elimina el campo `organizacion`: el nombre de la organización sale de la web.

**Opciones de `tipo_organizacion`** (valor → etiqueta):

- `medio` → Medio de comunicación
- `consultora` → Consultora
- `think_tank` → Think tank o centro de pensamiento
- `observatorio_destino` → Observatorio de destino
- `administracion` → Administración u organismo público
- `empresa` → Empresa
- `gremio` → Gremio, asociación o cámara de comercio
- `universidad` → Universidad o centro de investigación
- `agencia` → Agencia de comunicación o marketing
- `eventos` → Organizador de eventos, ferias o congresos
- `inversor` → Inversor o entidad financiera

## Textos

- **Título:** Cuéntenos qué necesita vigilar.
- **Entradilla:** Déjenos su web. Nuestro sistema analiza cómo se presenta su organización y prepara una primera radiografía, que le presentaremos en la reunión para ajustarla con usted.
- **Casilla de privacidad (obligatoria):** Acepto la [política de privacidad](/legal/privacidad) y que Voralis analice con inteligencia artificial la información pública de las webs indicadas para preparar mi propuesta.
  - El enlace abre en la misma pestaña. Si el formulario se pierde al navegar, ábrelo en una pestaña nueva.
- **Casilla de comunicaciones (opcional):** Quiero recibir novedades e información comercial de Voralis.
- **Botón:** Solicitar alta.
- **Nota bajo el botón:** No hay ningún compromiso hasta que acepte la propuesta.
- **Confirmación tras enviar** (sustituye al formulario en la misma página):
  - Título: Gracias.
  - Texto: Estamos analizando cómo se presenta su organización en su web. Le escribiremos para agendar la reunión en la que le enseñamos el resultado.
- **Errores** (bajo cada campo, en rojo y anunciados por `aria-live`):
  - Obligatorio vacío: Este campo es obligatorio.
  - Web o competidor no válido: Indique una dirección web válida, por ejemplo www.suorganizacion.com.
  - Correo no válido: Indique un correo electrónico válido.
  - Privacidad sin marcar: Para continuar, acepte la política de privacidad.

## Envío

1. **Nunca por GET ni con datos en la URL.** El `<form>` usa `method="post"` y el envío se gestiona con `onSubmit` + `preventDefault()`.
2. Valida en el cliente antes de enviar y vuelve a validar los mismos campos en la función de envío.
3. Crea `src/lib/solicitar-alta.ts` con:

```ts
export type SolicitudAlta = {
  web: string;                     // URL normalizada con https://
  tipo_organizacion: string;
  nombre: string;
  cargo: string;
  correo: string;
  telefono?: string;
  competidores: string[];          // 0 a 3 URL normalizadas
  prioridades?: string;
  plan?: "profesional" | "observatorio";
  acepta_privacidad: true;
  acepta_comunicaciones: boolean;
  origen: "landing";
  estado: "pendiente_revision";    // revisión previa: no lanza el análisis
  enviada_el: string;              // ISO 8601
  idioma_navegador: string;
};

export async function enviarSolicitudAlta(data: SolicitudAlta): Promise<{ ok: boolean }> {
  // TODO: conectar con la API autenticada de la plataforma (POST) antes del lanzamiento público.
  // La API guarda la solicitud en estado "pendiente_revision"; el análisis lo lanza el equipo tras revisarla.
  if (process.env.NODE_ENV !== "production") {
    console.info("[solicitar-alta] payload de prueba", { ...data, correo: "***", telefono: data.telefono ? "***" : undefined });
  }
  return { ok: true };
}
```

4. Mientras se envía, el botón se desactiva y muestra «Enviando…». Si `ok` es `false`, muestra: «No hemos podido enviar su solicitud. Inténtelo de nuevo o escríbanos desde Contacto.»
5. No guardes nada en `localStorage` ni en cookies.

## Contacto (`/contacto`)

- Añade las mismas dos casillas de consentimiento con los mismos textos. Cambia «para preparar mi propuesta» por «para responder a mi consulta» y quita la mención al análisis de webs.
- `method="post"` + `onSubmit` + `preventDefault()`.
- Función `src/lib/contacto.ts` con el mismo patrón y su `TODO`.

## Accesibilidad

- Cada campo tiene `<label>` asociado. Los obligatorios se marcan con «(obligatorio)» en texto, no solo con asterisco.
- Errores con `aria-invalid` y `aria-describedby`; foco en el primer campo con error al enviar.
- Toda la página es navegable con teclado.

## Criterios de aceptación

- [ ] El formulario muestra exactamente los 11 campos de la tabla y ya no pide organización, idioma, frecuencia ni destinatarios.
- [ ] `/solicitar-alta?plan=profesional` rellena el campo oculto; `?plan=cualquiercosa` lo deja vacío.
- [ ] No se puede enviar sin web válida, tipo, nombre, cargo, correo válido y privacidad marcada.
- [ ] `www.ejemplo.com` se guarda como `https://www.ejemplo.com`.
- [ ] Tras enviar, la URL no cambia ni lleva parámetros con datos, y aparece la confirmación.
- [ ] El payload de prueba lleva `estado: "pendiente_revision"` y no hay ninguna llamada a servicios externos.
- [ ] `/contacto` tiene las dos casillas y envía por POST sin datos en la URL.
- [ ] Sin errores en consola ni en `npm run build` / `npm run lint`.

Al terminar, enumera los archivos modificados y pega una captura o el HTML renderizado del formulario.
