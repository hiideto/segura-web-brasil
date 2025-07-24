import { Shield, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoEGolpe from "@/assets/logo-e-golpe.png";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer logout",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
    }
  };

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

          {/* User info and logout */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
            )}
            <Button 
              variant="outline" 
              onClick={handleSignOut}
            >
              Logout
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
              {user && (
                <div className="flex items-center space-x-2 py-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
              )}
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};