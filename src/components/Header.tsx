import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoEGolpe from "@/assets/logo-e-golpe.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoEGolpe} 
              alt="É Golpe Logo" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">É Golpe</h1>
              <p className="text-sm text-muted-foreground">Verificação Digital</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#verificar" className="text-foreground hover:text-primary transition-smooth">
              Verificar
            </a>
            <a href="#tendencias" className="text-foreground hover:text-primary transition-smooth">
              Tendências
            </a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-smooth">
              Sobre
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-smooth">
              Contato
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-primary">
              Verificar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a 
                href="#verificar" 
                className="text-foreground hover:text-primary transition-smooth py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Verificar
              </a>
              <a 
                href="#tendencias" 
                className="text-foreground hover:text-primary transition-smooth py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tendências
              </a>
              <a 
                href="#sobre" 
                className="text-foreground hover:text-primary transition-smooth py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <a 
                href="#contato" 
                className="text-foreground hover:text-primary transition-smooth py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <Button className="btn-primary mt-4">
                Verificar Agora
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};