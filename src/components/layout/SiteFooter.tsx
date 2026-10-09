import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/routing";

/**
 * El footer es oscuro en los dos temas: cierra la página con el mismo peso
 * que las superficies de producto y evita que en tema claro la página termine
 * desvaneciéndose en blanco.
 */
const LEGAL_ENTITY = "GJC";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  const links = [
    { label: t("legalNotice"), href: "/legal/aviso-legal" },
    { label: t("privacy"), href: "/legal/privacidad" },
    { label: t("terms"), href: "/legal/condiciones" },
    { label: t("aiUse"), href: "/legal/uso-de-ia" },
    { label: t("cookies"), href: "/legal/cookies" },
    { label: t("contact"), href: "/contacto" },
  ];

  return (
    <footer className="bg-[#08090d] py-16 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr] lg:items-start">
          <Reveal>
            <Logo tone="onDarkWhite" variant="isoHorizontal" />
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-brand-200/85">
              {t("tagline")}
            </p>
          </Reveal>

          <nav aria-label={t("linksAriaLabel")} className="lg:justify-self-end lg:self-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
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
          <p>
            {t("copyright", { entity: LEGAL_ENTITY })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
