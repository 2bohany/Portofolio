import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contributions } from "@/components/sections/Contributions";
import { TechnicalApproach } from "@/components/sections/TechnicalApproach";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <Education />
      <Contributions />
      <TechnicalApproach />
      <Contact />
    </>
  );
}
