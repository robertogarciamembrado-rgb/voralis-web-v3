// Type declarations for static asset imports.
//
// Why we declare these here:
//   Next.js ships `<reference types="next/image-types/global" />` inside
//   `next-env.d.ts`, but its own internal source notes that this file is
//   "conditionally added/removed" depending on whether static image import
//   handling is detected. In CI (node:20, fresh `npm ci`, no prior `next build`)
//   the reference is effectively not loaded, so any SVG import either errors
//   with TS2307 "Cannot find module" or, with an over-permissive local
//   declaration, with TS2339 "Property 'src' does not exist on type 'string'".
//
// Shape:
//   Next.js treats SVGs as static asset modules by default (no SVGR configured
//   here), so `import logo from './x.svg'` yields Next's `StaticImageData`:
//   `{ src: string; height: number; width: number }`. The components in this
//   project consume `.src` (e.g. `maskImage: url(${source.src})` and the
//   `icons.icon` entry in `app/layout.tsx`), so we mirror that shape.
//
// If SVGR (`@svgr/webpack`) is added later, change this to `any` (or a union
// with `React.ComponentType<React.SVGProps<SVGSVGElement>>`) to match what
// webpack would then resolve at build time.

declare module "*.svg" {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module "*.png" {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module "*.jpg" {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module "*.jpeg" {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module "*.webp" {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module "*.gif" {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module "*.avif" {
  const content: { src: string; height: number; width: number };
  export default content;
}