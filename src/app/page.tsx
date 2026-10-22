import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Method from "@/components/Method";
import Sheets from "@/components/Sheets";
import Record from "@/components/Record";
import Spec from "@/components/Spec";
import Contact from "@/components/Contact";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Method />
        <Sheets />
        <Record />
        <Spec />
      </main>
      <Contact />
      <Motion />
    </>
  );
}
