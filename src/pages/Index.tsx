import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { YouTubeVideo } from "@/components/YouTubeVideo";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Industries } from "@/components/Industries";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Events />
        <Industries />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
