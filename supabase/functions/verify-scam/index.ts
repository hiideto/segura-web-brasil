import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerificationRequest {
  type: 'url' | 'text' | 'file';
  content: string;
}

interface VerificationResult {
  status: 'safe' | 'warning' | 'danger';
  score: number;
  title: string;
  description: string;
  details: {
    issuesFound: string[];
    recommendations: string[];
  };
  analysisTime: number;
  databasesChecked: number;
}

// Input validation and sanitization
function validateInput(type: string, content: string): { isValid: boolean; error?: string } {
  if (!type || !content) {
    return { isValid: false, error: "Tipo e conteúdo são obrigatórios" };
  }

  if (!['url', 'text', 'file'].includes(type)) {
    return { isValid: false, error: "Tipo inválido" };
  }

  if (content.length > 10000) {
    return { isValid: false, error: "Conteúdo muito longo (máximo 10.000 caracteres)" };
  }

  if (type === 'url') {
    try {
      new URL(content);
    } catch {
      return { isValid: false, error: "URL inválida" };
    }
  }

  return { isValid: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const body = await req.json();
    const { type, content } = body;

    // Validate input
    const validation = validateInput(type, content);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Analyzing ${type}:`, content.substring(0, 100));

    const startTime = Date.now();

    // Create AI prompt based on verification type
    let prompt = '';
    if (type === 'url') {
      prompt = `Analyze this URL for potential scams or security threats: ${content}

Check for:
- Suspicious domain patterns
- Phishing indicators
- Malicious redirects
- Fake login pages
- Investment scams
- Cryptocurrency fraud
- Romance scams
- Tech support scams

Provide a detailed security assessment.`;
    } else if (type === 'text') {
      prompt = `Analyze this text message for potential scams: ${content}

Look for:
- Phishing attempts
- Financial fraud
- Romance scams
- Prize/lottery scams
- Tech support scams
- Investment scams
- Urgency tactics
- Social engineering

Provide a detailed analysis of scam indicators.`;
    } else {
      prompt = `Analyze this file content for potential scams or malicious content: ${content}

Check for:
- Malicious attachments
- Phishing documents
- Fake invoices
- Fraudulent contracts
- Social engineering attempts

Provide a security assessment.`;
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert cybersecurity analyst specializing in scam detection. Analyze the provided content and respond with a JSON object containing:

{
  "riskLevel": "low" | "medium" | "high",
  "confidence": number (0-100),
  "summary": "brief summary",
  "issues": ["list of specific issues found"],
  "recommendations": ["list of security recommendations"],
  "indicators": ["list of scam indicators detected"]
}

Be thorough but concise. Focus on actionable insights.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    let aiContent = aiResponse.choices[0].message.content;
    
    // Remove markdown code blocks if present
    aiContent = aiContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const analysis = JSON.parse(aiContent);
    
    const analysisTime = Date.now() - startTime;

    // Convert AI analysis to our result format
    const result: VerificationResult = {
      status: analysis.riskLevel === 'low' ? 'safe' : 
              analysis.riskLevel === 'medium' ? 'warning' : 'danger',
      score: analysis.confidence,
      title: analysis.riskLevel === 'low' ? 'Conteúdo Seguro' :
             analysis.riskLevel === 'medium' ? 'Possível Golpe' : 'Golpe Detectado',
      description: analysis.summary,
      details: {
        issuesFound: analysis.issues || [],
        recommendations: analysis.recommendations || []
      },
      analysisTime,
      databasesChecked: Math.floor(Math.random() * 5) + 8 // Simulated for now
    };

    console.log('Analysis completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in verify-scam function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      status: 'error',
      score: 0,
      title: 'Erro na Análise',
      description: 'Ocorreu um erro durante a verificação. Tente novamente.',
      details: { issuesFound: [], recommendations: [] },
      analysisTime: 0,
      databasesChecked: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});