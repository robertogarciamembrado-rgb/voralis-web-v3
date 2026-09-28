import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { nav } from "@/content/site";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Header sticky. Server Component: el único JS que envía es el del menú móvil
 * y el del conmutador de tema, ambos islas de cliente.
 * Menú según brief §5 — sin entrada "Agentes".
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/80 backdrop-blur-xl">
      <Container className="relative">
        <div className="flex h-[4.25rem] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative text-sm font-semibold text-fg-soft transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={nav.cta.href}
              className="hidden items-center gap-2.5 rounded-xl bg-accent py-2.5 pl-4 pr-2.5 text-[0.8125rem] font-extrabold text-white shadow-brand transition-[background-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-card active:translate-y-0 motion-reduce:transform-none sm:inline-flex"
            >
              {nav.cta.label}
              <span
                aria-hidden="true"
                className="grid size-6 place-items-center rounded-md bg-white/20 text-sm leading-none"
              >
                →
              </span>
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
