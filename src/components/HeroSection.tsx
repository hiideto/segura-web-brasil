import { Shield, Upload, Link, Image, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const [verificationMethod, setVerificationMethod] = useState<'url' | 'text' | 'file'>('url');
  const [inputValue, setInputValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerification = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, insira o conteúdo para verificação.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simular verificação (em produção seria chamada para API)
    setTimeout(() => {
      setIsVerifying(false);
      // Scroll para seção de resultados
      document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });
      
      toast({
        title: "Verificação concluída",
        description: "Confira os resultados abaixo.",
      });
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputValue(file.name);
    }
  };

  return (
    <section className="hero-gradient text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Proteja-se de <span className="text-yellow-300">Golpes Digitais</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
              Verifique sites, links, mensagens e arquivos em segundos.<br />
              <strong>35% dos brasileiros</strong> já caíram em golpes online. Não seja o próximo!
            </p>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">+1.2M</div>
                <div className="text-white/80">Verificações realizadas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">87%</div>
                <div className="text-white/80">Taxa de precisão</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Proteção ativa</div>
              </div>
            </div>
          </div>

          {/* Verification Interface */}
          <div className="card-trust bg-white text-foreground max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Verificar Agora - Grátis</h2>
            
            {/* Method Selection */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-muted rounded-xl p-1">
                <button
                  onClick={() => setVerificationMethod('url')}
                  className={`px-4 py-2 rounded-lg transition-smooth flex items-center space-x-2 ${
                    verificationMethod === 'url' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Link className="w-4 h-4" />
                  <span>Link/Site</span>
                </button>
                <button
                  onClick={() => setVerificationMethod('text')}
                  className={`px-4 py-2 rounded-lg transition-smooth flex items-center space-x-2 ${
                    verificationMethod === 'text' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Texto</span>
                </button>
                <button
                  onClick={() => setVerificationMethod('file')}
                  className={`px-4 py-2 rounded-lg transition-smooth flex items-center space-x-2 ${
                    verificationMethod === 'file' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Arquivo</span>
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="mb-6">
              {verificationMethod === 'url' && (
                <div>
                  <Input
                    type="url"
                    placeholder="Cole o link suspeito aqui (ex: https://site-suspeito.com)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="text-lg py-4 h-14"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    ✓ Links de WhatsApp, e-mail, redes sociais ou qualquer site
                  </p>
                </div>
              )}

              {verificationMethod === 'text' && (
                <div>
                  <Textarea
                    placeholder="Cole a mensagem suspeita aqui (ex: mensagem de Pix, promoção, prêmio)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="min-h-24 text-lg"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    ✓ Mensagens de WhatsApp, SMS, e-mail ou redes sociais
                  </p>
                </div>
              )}

              {verificationMethod === 'file' && (
                <div className="upload-area">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">
                      {inputValue || "Envie um arquivo para verificação"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PDF, imagens (JPG, PNG) até 10MB
                    </p>
                  </label>
                </div>
              )}
            </div>

            {/* Verification Button */}
            <Button
              onClick={handleVerification}
              disabled={isVerifying}
              className="btn-verify w-full mb-4"
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verificando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Verificar Agora</span>
                </div>
              )}
            </Button>

            {/* Free Usage Note */}
            <p className="text-sm text-muted-foreground text-center">
              🎁 <strong>1 verificação gratuita</strong> · Acesso ilimitado por apenas <strong>R$ 20 vitalício</strong>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-white/80 mb-4">Confiado por milhares de brasileiros</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-white/60">🛡️ SSL Seguro</div>
              <div className="text-white/60">🔒 Dados Protegidos</div>
              <div className="text-white/60">⚡ Verificação Instantânea</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};