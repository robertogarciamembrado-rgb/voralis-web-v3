import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Capabilities } from "@/components/sections/Capabilities";
import { Impact } from "@/components/sections/Impact";
import { Cases } from "@/components/sections/Cases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCta } from "@/components/sections/FinalCta";
import { Pricing } from "@/components/sections/Pricing";
import { SHOW_PRICING } from "@/content/site";

/**
 * Home de Voralis. Orden según Voralis_Textos_Landing_v2.md:
 * 1 Portada · 2 Problema · 3 Para qué y para quién · 4 Resultados y casos ·
 * 5 Cómo funciona · (6 Planes, Fase 3, tras el interruptor) · 7 Llamada final.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 01 */} <Hero />
      {/* 02 */} <Problem />
      {/* 03 */} <Capabilities />
      {/* 04 */} <Impact />
      {/* 04 */} <Cases />
      {/* 05 */} <HowItWorks />
      {/* 06 */} {SHOW_PRICING ? <Pricing /> : null}
      {/* 07 */} <FinalCta />
    </>
  );
}
