import { CheckCircle, AlertTriangle, XCircle, Eye, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ResultsSection = () => {
  // Exemplo de resultado (seria dinâmico baseado na verificação)
  const mockResult = {
    status: 'danger', // 'safe', 'warning', 'danger'
    score: 85,
    title: 'Site Perigoso Detectado',
    description: 'Este site apresenta características típicas de golpes financeiros.',
    details: [
      'Domínio registrado há apenas 3 dias',
      'Certificado SSL suspeito',
      'Reportado em 15 bases de dados de fraude',
      'Utiliza técnicas de phishing conhecidas'
    ],
    recommendations: [
      'NÃO insira dados pessoais ou financeiros',
      'NÃO realize pagamentos neste site',
      'Bloqueie o domínio em seu navegador',
      'Reporte para as autoridades competentes'
    ]
  };

  const getResultConfig = (status: string) => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          className: 'result-safe',
          color: 'text-safe',
          bgColor: 'bg-safe/10',
          title: 'Site Seguro',
          subtitle: 'Verificação aprovada'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          className: 'result-warning',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          title: 'Site Suspeito',
          subtitle: 'Proceda com cautela'
        };
      case 'danger':
        return {
          icon: XCircle,
          className: 'result-danger',
          color: 'text-danger',
          bgColor: 'bg-danger/10',
          title: 'Site Perigoso',
          subtitle: 'Alto risco de golpe'
        };
      default:
        return {
          icon: AlertTriangle,
          className: 'result-warning',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          title: 'Resultado Indefinido',
          subtitle: 'Análise inconclusiva'
        };
    }
  };

  const config = getResultConfig(mockResult.status);
  const ResultIcon = config.icon;

  return (
    <section id="resultados" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Result Header */}
          <div className={`${config.className} mb-8`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-full ${config.bgColor}`}>
                <ResultIcon className={`w-8 h-8 ${config.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{mockResult.title}</h2>
                <p className="text-lg opacity-90">{config.subtitle}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-3xl font-bold">{mockResult.score}%</div>
                <div className="text-sm opacity-75">Risco detectado</div>
              </div>
            </div>
            <p className="text-lg">{mockResult.description}</p>
          </div>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Issues Found */}
            <div className="card-trust">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-danger mr-2" />
                Problemas Identificados
              </h3>
              <ul className="space-y-3">
                {mockResult.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-danger rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="card-trust">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-safe mr-2" />
                Recomendações
              </h3>
              <ul className="space-y-3">
                {mockResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-safe rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-trust text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Análise Instantânea</h4>
              <p className="text-sm text-muted-foreground">
                Verificação completa em menos de 3 segundos
              </p>
            </div>
            <div className="card-trust text-center">
              <Eye className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">15 Bases de Dados</h4>
              <p className="text-sm text-muted-foreground">
                Consultamos múltiplas fontes de segurança
              </p>
            </div>
            <div className="card-trust text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Comunidade Ativa</h4>
              <p className="text-sm text-muted-foreground">
                Relatórios de usuários em tempo real
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="space-x-4">
              <Button className="btn-primary">
                Nova Verificação
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Reportar Erro
              </Button>
            </div>
            
            {/* Upgrade CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-semibold mb-2">Verificações Ilimitadas</h3>
              <p className="text-muted-foreground mb-4">
                Tenha acesso total à nossa plataforma de verificação por toda a vida
              </p>
              <Button className="btn-primary">
                Comprar Acesso Vitalício - R$ 20
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                ✓ Verificações ilimitadas ✓ Relatórios detalhados ✓ Suporte prioritário
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};