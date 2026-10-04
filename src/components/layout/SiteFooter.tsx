import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
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
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr] lg:items-start">
          <Reveal>
            <Logo tone="onDarkWhite" variant="isoHorizontal" />
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-brand-200/85">
              {footer.tagline}
            </p>
          </Reveal>

          <nav aria-label="Enlaces legales y contacto" className="lg:justify-self-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footer.links.map((link) => (
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
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-brand-200/70">
          <p>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
