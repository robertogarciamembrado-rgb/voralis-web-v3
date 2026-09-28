import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footer } from "@/content/site";

/**
 * El footer es oscuro en los dos temas: cierra la página con el mismo peso
 * que las superficies de producto y evita que en tema claro la página termine
 * desvaneciéndose en blanco.
 */
export function SiteFooter() {
  return (
    <footer className="bg-[#08090d] py-16 text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo tone="onDark" />
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-brand-200/85">
              {footer.tagline}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-300">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-200/85 transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-200/70 sm:flex-row sm:items-center sm:justify-between">
          {/* Brief §16: única ubicación permitida para la referencia a TS Orbix. */}
          <p>{footer.institutional}</p>
          <p>© {new Date().getFullYear()} VORALIS</p>
        </div>
      </Container>
    </footer>
  );
}
