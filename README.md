# VORALIS — Web comercial (Next.js)

Migración de la landing de prototipo (HTML/CSS/JS) a **Next.js 15 (App Router) + React 19 + Tailwind CSS v4**, siguiendo el *Brief de diseño y contenidos de la web* (versión actualizada).

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
npm run typecheck
```

Node 20+.

---

## Qué cambia respecto al prototipo

| | Prototipo | Esta versión |
|---|---|---|
| Narrativa | Colección de 5 agentes de IA | Plataforma de inteligencia; los motores explican el *cómo*, no son el producto |
| Hero | "La inteligencia que conoce tu mundo" + "Para organizaciones de la red TS Orbix" | H1 del brief; **cero** referencias a TS Orbix |
| Visual del hero | Captura PNG del dashboard de Vigilante | Panel de inteligencia en React/Tailwind, datos desde `content/` |
| Jerarquía | Los 5 agentes al mismo nivel (Vigilante destacado) | VORALIS → Vigilante + Pulse (motores) → Profesor/Congress/Historiador (agentes) |
| Cifras | Ninguna | Métricas + estimación de impacto, cada una etiquetada *Dato real* / *Estimación* |
| Casos | Ninguno | Tourism & Society Think Tank + Trabitat |
| Bloques | 6 secciones + widget de chat | 7 bloques exactos |
| Tema | Solo claro | Claro (por defecto) + oscuro conmutable |

La identidad visual **se conserva** en el tema claro, que es el por defecto: azul `#1768ff`, navy, verde señal, Inter, fondos limpios, sistema de tarjetas y estética premium.

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx          Header + footer, metadata, fuente auto-alojada
│   ├── page.tsx            Composición de los 7 bloques (y solo 7)
│   └── globals.css         Tokens de los dos temas, base, border beam, animaciones
├── content/
│   ├── home.ts             ★ Todo el copy y los datos de la home
│   └── site.ts             Navegación y footer
├── components/
│   ├── sections/           Un componente por bloque del brief
│   │   ├── Hero.tsx              01
│   │   ├── Problem.tsx           02
│   │   ├── Capabilities.tsx      03
│   │   ├── Impact.tsx            04
│   │   ├── Cases.tsx             05
│   │   ├── HowItWorks.tsx        06 (motores + agentes especializados)
│   │   └── FinalCta.tsx          07
│   ├── hero/
│   │   ├── IntelligenceDashboard.tsx   Panel del hero
│   │   └── Sparkline.tsx               Gráfico SVG sin librería
│   ├── layout/             SiteHeader, SiteFooter, MobileNav, ThemeToggle
│   └── ui/                 Button, Container, Section, Eyebrow, Logo,
│                           DataKindBadge, Icon (registro Lucide), Reveal
├── fonts/                  Inter variable auto-alojada (OFL)
└── lib/cn.ts
```

**Los componentes no contienen texto.** Todo el copy vive en `src/content/`. Para cambiar un mensaje se edita el contenido, no el layout — y cualquier desvío respecto al brief se detecta en un solo archivo.

---

## Reglas del brief incorporadas al código

Estas no son preferencias de estilo; son restricciones. Si alguien las rompe, la web deja de cumplir el brief.

1. **Máximo 7 bloques.** `page.tsx` los numera. Añadir uno exige retirar otro.
2. **H1 literal:** *"Convierte la información de tu entorno en inteligencia para decidir mejor."* — en `content/home.ts`.
3. **TS Orbix solo en el footer.** Vive en `content/site.ts` (`footer.institutional`) y en ningún otro sitio. La home se entiende sin haber oído hablar de la red.
4. **Jerarquía de arquitectura.** En `HowItWorks.tsx`: Vigilante y Pulse son dos superficies oscuras grandes y simétricas; los tres agentes especializados van después, en tarjetas claras y menores. No pueden competir visualmente.
5. **Nomenclatura.** Vigilante y Pulse se llaman *motores de inteligencia*, nunca "dos agentes más".
6. **Beneficio antes que motor.** En las tarjetas de capacidades el titular es la necesidad; el motor aparece como pie discreto "Powered by…".
7. **Dato real vs. estimación.** Toda cifra publicada pasa por `<DataKindBadge>`, que la obliga a declararse. La estimación principal muestra su fórmula en pantalla (500 fuentes × 10 min ≈ 83 h, el ejemplo del propio brief §10).
8. **Datos de ejemplo marcados.** El panel del hero muestra el badge "Vista de ejemplo" mientras `heroDashboard.isSample` sea `true`.

---

## Cumplimiento de `nextjs-frontend-ui-ux`

| Regla | Estado |
|---|---|
| Server Components por defecto | ✅ Tres islas de cliente: `MobileNav`, `ThemeToggle`, `Reveal` |
| Estructura modular | ✅ Un componente por bloque + primitivas en `ui/` |
| `next/link` para navegación | ✅ Todos los enlaces internos |
| `next/image` | ➖ El proyecto no tiene imágenes: el dashboard del hero es SVG y DOM, el logo es CSS. Cuando entren capturas de caso, obligatorio |
| Espacios generosos | ✅ `py-20 → 28` por sección, `p-7 → p-9` en tarjetas |
| Paleta coherente y sobria | ✅ Tokens semánticos conmutables por tema; ningún hex en componentes |
| Tipografía cuidada | ✅ Pesos, `tracking` y `leading` definidos por escala, no ad hoc |
| Bordes suaves, sombras sutiles | ✅ `.card-surface`: `rounded-2xl`, borde tenue y `shadow-soft` |
| Contraste WCAG | ✅ Verificado en los dos temas; texto pequeño ≥ 4.5:1 sobre claro y ≥ 6.5:1 sobre oscuro |
| Mobile-first | ✅ Base sin prefijo = móvil; `sm:`/`md:`/`lg:` amplían |
| Estados `hover` / `focus` / `active` | ✅ En botones, enlaces, tarjetas y CTA de cabecera |
| Transiciones suaves | ✅ 300 ms con curva única (ver nota abajo) |
| HTML semántico | ✅ `header` / `main` / `section` / `article` |
| Prioridad al valor de negocio | ✅ Beneficio → capacidad → prueba → tecnología |

**Dos desviaciones deliberadas**, ambas a favor del rendimiento:

1. **`transition-all` → propiedades enumeradas.** Se mantienen los 300 ms, pero `all` también anima ancho, alto y espaciado; en botones que envuelven texto variable eso produce reflow visible en cada hover. El efecto percibido es idéntico, el coste de render no.
2. **`<ul>` / `<li>` en las rejillas de tarjetas** en lugar de `<article>` suelto. Un conjunto de tarjetas hermanas *es* una lista, y los lectores de pantalla anuncian "lista de 5 elementos", que es información útil. `<article>` se reserva para contenido independiente: los casos y los dos motores.

---

## Dirección visual: estructura Linear, identidad VORALIS

La home adopta el lenguaje estructural de Linear —bento asimétrico, tipografía muy apretada, bordes de 1px casi invisibles, aire generoso, entradas al scroll— **sin** convertirse en una web oscura. El §18 del brief es una decisión cerrada ("mantener la identidad actual, fondos limpios"), así que el claro sigue siendo el rostro por defecto y el oscuro es una elección del visitante.

**Doble tema.** Tokens semánticos (`surface`, `sunken`, `raised`, `fg`, `muted`, `line`, `accent`) que apuntan a variables de runtime conmutadas por `[data-theme]`. Ningún componente escribe un color literal, así que añadir un tercer tema sería editar un bloque de `globals.css`.

- Claro por defecto. No se lee `prefers-color-scheme`: arrancar en oscuro para media internet contradiría la identidad acordada.
- Elección persistida en `localStorage` y aplicada por un script síncrono en `<head>`, antes del primer pintado. Sin él, quien elige oscuro ve un fogonazo blanco en cada carga.
- La paleta oscura se deriva del Radar Estratégico real: casi negro azulado, azul de marca aclarado a `#5b9bff` para conservar contraste, y el verde señal como único color vivo.

**Las superficies de producto son oscuras en los dos temas.** El panel del hero, los dos motores y el CTA final representan pantallas reales; si se aclarasen en tema claro perderían esa lectura. Lo que conmuta es el cromo de la página, no el producto.

**Componentes tipo Linear incluidos:**

| Pieza | Dónde | Implementación |
|---|---|---|
| Bento grid | Bloque 3 (Capacidades) | Tarjeta destacada a doble altura + 2×2 a su derecha |
| Border beam | Panel del hero y tarjeta destacada | CSS puro: `conic-gradient` + `mask-composite` + `@property` |
| Reveal al scroll | Bloques 2–7 | Framer Motion (`motion/react`), una sola isla de cliente |
| Iconografía | Toda la home | Lucide React, trazo 1.75 unificado en un único registro |

**Meteor Shower y Glowing Stars quedaron fuera a propósito.** Linear no los usa, y el brief pide "directa + empresarial + demostrable, NO tecnológica". Meteoros sobre una web que vende rigor analítico restan credibilidad en vez de sumarla.

---

## Alineación con el producto real

La primera versión del hero llevaba cifras inventadas. Ahora el panel replica el **Radar Estratégico**, la pantalla de entrada real, con la nomenclatura que la Especificación funcional ya cerró:

| Antes (nombre técnico) | Ahora (valor para el usuario) |
|---|---|
| Noticias capturadas | **Información relevante** |
| Élite Pata Negra | **Alto impacto** |
| Score medio | **Impacto medio** (ALTO/MEDIO/BAJO) |
| Balance por Ejes / Sectores | **Actividad** por Ejes / Sectores |
| Pulso de Recaudación (30D) | **Actividad informativa · Últimos 30 días** |
| Pestaña "Vigilancia" | **Radar Estratégico** |
| Pestaña "Dashboard" | **Noticias Relevantes** |

Es el mismo principio que rige el brief de web, y Diana lo formula igual en los dos documentos: un nombre técnico describe lo que hace el sistema; un nombre de producto comunica lo que recibe el usuario.

Las cifras del caso TSTT proceden ahora del Radar de julio de 2026 (37 entradas, 9 ejes, 15–20 min de lectura) y del embudo documentado del motor (150+ candidatas por ciclo, ciclo de 28 días), no de estimaciones nuestras.

**Añadido:** una franja de cumplimiento dentro del bloque 6 —no un bloque nuevo, el máximo de 7 se respeta— con la clasificación de riesgo limitado bajo el Reglamento Europeo de IA y el análisis agregado por temas. Para una plataforma de inteligencia vendida en la UE eso es argumento comercial, no letra pequeña.

---

## Decisiones técnicas

**Server Components por defecto.** Tres islas de cliente en total: `MobileNav`, `ThemeToggle` y `Reveal`. Las secciones se renderizan en servidor y se pasan como `children` al wrapper animado, así que su HTML nunca entra en el bundle.

**Coste del movimiento, dicho claro.** Framer Motion y Lucide llevan la página de 162 B a 39,9 kB de JS propio (146 kB de First Load). Es el precio de la animación al scroll que pide el encargo. Si en algún momento pesa más que el efecto, `Reveal` es el único punto a cambiar: las animaciones al scroll nativas de CSS (`animation-timeline: view()`) harían lo mismo con 0 kB.

**Nada del contenido depende de que el JavaScript funcione.** Motion serializa su estado inicial como estilo inline, así que el HTML del servidor sale en opacidad 0. Un `<noscript>` en `<head>` lo fuerza a visible: sin él, medio sitio sería invisible para quien desactive JS o para un rastreador que no lo ejecute.

**Sin librería de gráficos.** El sparkline son ~60 líneas de SVG generado en servidor. Recharts habría añadido ~90 kB al bundle para dibujar catorce puntos.

**Sin dependencia de Aceternity ni Magic UI.** Ambas son colecciones para copiar y pegar (estilo shadcn), no paquetes de npm, y sus fragmentos declaran los keyframes en el `tailwind.config.ts` de Tailwind v3, que este proyecto no usa. El border beam está reescrito sobre nuestros tokens con la técnica estándar de `conic-gradient` + `mask-composite`: mismo resultado, cero JavaScript y una dependencia menos que auditar.

**Tipografía auto-alojada.** Inter variable en `src/fonts/` vía `next/font/local` en lugar de `next/font/google`: cero peticiones a terceros en producción, sin la exposición RGPD del hotlinking a Google Fonts en la UE, y el build no depende de la red (CI aislado incluido). Licencia OFL incluida.

**Tokens, no valores literales.** Colores, tipografía, sombras y radios se definen una vez en `@theme` (`globals.css`). Ningún componente escribe un hex.

**Una sola superficie de tarjeta.** `.card-surface` (radio, borde, elevación, curva) vive en `@layer components`, no como cadena de utilidades repetida seis veces. Cambiar el acabado de las tarjetas de la home es editar un bloque. Seis tarjetas que divergen poco a poco es como se degrada un sistema de diseño.

**Movimiento.** Animaciones solo en CSS, todas anuladas bajo `prefers-reduced-motion`.

---

## Accesibilidad

- Un solo `<h1>`; jerarquía de encabezados continua; cada `<section>` con `aria-labelledby`.
- Enlace "Saltar al contenido" como primer foco.
- Foco visible global (`:focus-visible`), sin `outline: none` en ninguna parte.
- Contraste verificado sobre las dos superficies: texto pequeño ≥ 4.5:1 en fondo claro (`muted` a opacidad plena rinde 5.2:1) y ≥ 5.2:1 en los paneles navy.
- El sparkline expone `role="img"` con `aria-label` descriptivo; los elementos decorativos van con `aria-hidden`.
- Menú móvil con `aria-expanded`/`aria-controls`, cierre con `Escape` y bloqueo de scroll de fondo.

---

## Pendiente

- [ ] Sustituir los datos de ejemplo del hero por lectura real y poner `isSample: false`.
- [ ] **Visto bueno de Diana al doble tema.** El §18 del brief solo contempla la identidad clara. El oscuro se ha construido como opción del visitante, no como cambio de identidad, pero es una decisión suya.
- [ ] Validar con Dirección las tres métricas de cada caso (las de Trabitat siguen sin consolidar).
- [ ] Páginas de detalle: `/casos/tstt`, `/casos/trabitat`, `/agentes`, `/contacto`.
- [ ] Formulario de contacto (el CTA final apunta a `/contacto`; el prototipo tenía el formulario embebido).
- [ ] *Impact Calculator* (fuentes + frecuencia + tiempo medio de revisión), evolución a medio plazo prevista en el brief §10.
- [ ] Imágenes OG/Twitter y favicon definitivos.
