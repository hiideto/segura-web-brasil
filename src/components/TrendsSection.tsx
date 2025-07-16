import { TrendingUp, AlertCircle, Users, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TrendsSection = () => {
  const trends = [
    {
      id: 1,
      title: "Golpe do Pix Falso",
      description: "Criminosos criam QR codes falsos para roubar dinheiro via Pix",
      impact: "Alto",
      cases: "2.847",
      growth: "+127%",
      date: "Última semana",
      category: "Financeiro",
      color: "danger"
    },
    {
      id: 2,
      title: "WhatsApp Clonado",
      description: "Golpistas se passam por familiares pedindo dinheiro emprestado",
      impact: "Médio",
      cases: "1.523",
      growth: "+89%",
      date: "Últimos 15 dias",
      category: "Social",
      color: "warning"
    },
    {
      id: 3,
      title: "Falso Desconto Black Friday",
      description: "Sites fraudulentos oferecendo descontos impossíveis",
      impact: "Alto",
      cases: "934",
      growth: "+201%",
      date: "Última semana",
      category: "E-commerce",
      color: "danger"
    },
    {
      id: 4,
      title: "Boleto Falso",
      description: "Boletos bancários com códigos de barras modificados",
      impact: "Médio",
      cases: "687",
      growth: "+45%",
      date: "Últimos 30 dias",
      category: "Financeiro",
      color: "warning"
    }
  ];

  const getImpactConfig = (impact: string) => {
    switch (impact) {
      case "Alto":
        return { color: "text-danger", bg: "bg-danger/10", border: "border-danger/30" };
      case "Médio":
        return { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" };
      case "Baixo":
        return { color: "text-safe", bg: "bg-safe/10", border: "border-safe/30" };
      default:
        return { color: "text-muted-foreground", bg: "bg-muted", border: "border-border" };
    }
  };

  return (
    <section id="tendencias" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tendências de Golpes em Tempo Real
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitore os golpes mais reportados no Brasil e mantenha-se protegido com nossa inteligência artificial
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="card-trust text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">6.991</div>
              <div className="text-sm text-muted-foreground">Golpes detectados hoje</div>
            </div>
            <div className="card-trust text-center">
              <AlertCircle className="w-8 h-8 text-danger mx-auto mb-3" />
              <div className="text-2xl font-bold text-danger">127</div>
              <div className="text-sm text-muted-foreground">Novos domínios suspeitos</div>
            </div>
            <div className="card-trust text-center">
              <Users className="w-8 h-8 text-safe mx-auto mb-3" />
              <div className="text-2xl font-bold text-safe">45.283</div>
              <div className="text-sm text-muted-foreground">Usuários protegidos</div>
            </div>
            <div className="card-trust text-center">
              <Calendar className="w-8 h-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-warning">R$ 2,3M</div>
              <div className="text-sm text-muted-foreground">Perdas evitadas</div>
            </div>
          </div>

          {/* Trends List */}
          <div className="space-y-6">
            {trends.map((trend, index) => {
              const impactConfig = getImpactConfig(trend.impact);
              return (
                <div key={trend.id} className="card-trust">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${impactConfig.bg} ${impactConfig.color} ${impactConfig.border} border`}>
                            {trend.impact} Risco
                          </div>
                          <div className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            {trend.category}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{trend.title}</h3>
                      <p className="text-muted-foreground mb-3">{trend.description}</p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span><strong>{trend.cases}</strong> casos reportados</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-danger" />
                          <span className="text-danger font-medium">{trend.growth}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{trend.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:ml-6">
                      <Button variant="outline" size="sm" className="w-full lg:w-auto">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="card-trust max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Receba Alertas de Segurança</h3>
              <p className="text-muted-foreground mb-6">
                Seja notificado sobre novos golpes e mantenha-se sempre protegido
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary">
                  Ativar Alertas Gratuitos
                </Button>
                <Button variant="outline">
                  Baixar Relatório Semanal
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                ✓ Sem spam ✓ Cancelar a qualquer momento ✓ Dados 100% seguros
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};