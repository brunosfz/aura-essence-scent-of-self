import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { LegalPage } from "@/components/aura/LegalPage";

export const Route = createFileRoute("/trocas")({
  head: () => ({ meta: [{ title: "Trocas e Devoluções — AURA Essence" }] }),
  component: () => (
    <Layout>
      <LegalPage title="Trocas e Devoluções" updated="Conforme Código de Defesa do Consumidor" sections={[
        { h: "Prazo de arrependimento", p: "Você tem até 7 dias corridos após o recebimento para desistir da compra, conforme o Art. 49 do CDC. O produto deve estar lacrado, sem uso, na embalagem original." },
        { h: "Trocas por defeito", p: "Em caso de defeito de fabricação, você tem até 30 dias para solicitar a troca. Entre em contato pelo e-mail trocas@auraessence.com com fotos do produto." },
        { h: "Como solicitar", p: "Envie um e-mail com seu número de pedido, motivo da troca e fotos (se aplicável). Após análise, enviaremos as instruções para postagem." },
        { h: "Estorno", p: "Após o recebimento e análise do produto, o estorno é processado em até 7 dias úteis, no mesmo método de pagamento usado na compra." },
        { h: "Não realizamos trocas de", p: "Produtos abertos, usados ou sem embalagem original, salvo em caso de defeito comprovado." },
      ]} />
    </Layout>
  ),
});
