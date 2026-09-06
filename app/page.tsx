import { Book, CTABand } from "@/components/Book";
import { Enemy } from "@/components/Enemy";
import { FAQ } from "@/components/FAQ";
import { GTMStrip } from "@/components/GTMStrip";
import { Hero } from "@/components/Hero";
import { Mechanism } from "@/components/Mechanism";
import { Proof } from "@/components/Proof";
import { VSL } from "@/components/VSL";
import { WhoFor } from "@/components/WhoFor";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Enemy />
      <VSL />
      <Mechanism />
      <Proof />
      <WhoFor />
      <GTMStrip />
      <CTABand />
      <FAQ />
      <Book />
    </main>
  );
}
