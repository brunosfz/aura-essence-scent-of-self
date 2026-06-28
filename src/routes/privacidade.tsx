import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { LegalPage } from "@/components/aura/LegalPage";

export const Route = createFileRoute("/privacidade")({
  head: () => ({ meta: [{ title: "Política de Privacidade — AURA Essence" }] }),
  component: () => (
    <Layout>
      <LegalPage title="Política de Privacidade" updated="Atualizada em junho de 2026" sections={[
        { h: "Dados que coletamos", p: "Coletamos dados que você nos fornece ao realizar pedidos (nome, e-mail, endereço, telefone, CPF) e dados de navegação anônimos para melhorar sua experiência." },
        { h: "Como usamos seus dados", p: "Utilizamos suas informações para processar pedidos, enviar comunicações relevantes, melhorar nossos produtos e cumprir obrigações legais. Nunca vendemos seus dados a terceiros." },
        { h: "Cookies", p: "Usamos cookies essenciais para o funcionamento da loja e cookies analíticos para entender o comportamento de navegação. Você pode gerenciar cookies pelas configurações do seu navegador." },
        { h: "Seus direitos (LGPD)", p: "Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados a qualquer momento pelo e-mail privacidade@auraessence.com." },
        { h: "Segurança", p: "Adotamos práticas técnicas e organizacionais para proteger seus dados, incluindo criptografia em trânsito e em repouso." },
      ]} />
    </Layout>
  ),
});
