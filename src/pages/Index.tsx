import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ResultsSection } from "@/components/ResultsSection";
import { TrendsSection } from "@/components/TrendsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ResultsSection />
      <TrendsSection />
      <Footer />
    </div>
  );
};

export default Index;
