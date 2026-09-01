import AiBlock from "@/components/AiBlock";
import Audience from "@/components/Audience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Industries />
        <WhyUs />
        <Services />
        <AiBlock />
        <Process />
        <Audience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
