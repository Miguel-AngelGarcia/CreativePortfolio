import Image from "next/image";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Stack from "@/components/Stack/Stack";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Stack />
    </>
  );
}
