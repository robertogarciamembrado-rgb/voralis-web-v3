import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Capabilities } from "@/components/sections/Capabilities";
import { Impact } from "@/components/sections/Impact";
import { Cases } from "@/components/sections/Cases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Home de VORALIS.
 *
 * Estructura de 7 bloques (máximo innegociable del brief §4). No añadir
 * secciones aquí sin retirar otra: la home corta es un requisito comercial,
 * no una preferencia de diseño.
 *
 * Orden narrativo: beneficio → capacidad → prueba → tecnología.
 * La tecnología (Vigilante, Pulse, agentes) aparece deliberadamente en el
 * bloque 6, después de que los resultados y los casos hayan demostrado valor.
 */
export default function HomePage() {
  return (
    <>
      {/* 01 */} <Hero />
      {/* 02 */} <Problem />
      {/* 03 */} <Capabilities />
      {/* 04 */} <Impact />
      {/* 05 */} <Cases />
      {/* 06 */} <HowItWorks />
      {/* 07 */} <FinalCta />
    </>
  );
}
