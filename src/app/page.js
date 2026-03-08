import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-white text-zinc-800 dark:bg-black dark:text-zinc-200 transition-colors duration-300">
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}