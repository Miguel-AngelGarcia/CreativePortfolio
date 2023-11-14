import Image from "next/image";
import Hero from "@/components/Hero/Hero";
import Work from "@/components/Work";
import Stack from "@/components/Stack/Stack";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <>
      <div className="sect-wrapper">
        <Hero />
        <Work />
        <Projects />
        <Stack />
      </div>

      <footer className="false-footer"></footer>
      <Footer />
    </>
  );
}
