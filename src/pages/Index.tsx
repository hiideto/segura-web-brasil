import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ResultsSection } from "@/components/ResultsSection";
import { TrendsSection } from "@/components/TrendsSection";
import { Footer } from "@/components/Footer";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

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
