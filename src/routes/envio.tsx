import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { LegalPage } from "@/components/aura/LegalPage";

export const Route = createFileRoute("/envio")({
  head: () => ({ meta: [{ title: "Envio — AURA Essence" }] }),
  component: () => (
    <Layout>
      <LegalPage title="Prazos e Envio" updated="Frete grátis acima de R$ 250" sections={[
        { h: "Prazo de preparação", p: "Pedidos são preparados em até 2 dias úteis. Cada produto é embalado à mão com carinho e cuidado." },
        { h: "Prazos de entrega", p: "Sudeste: 3 a 6 dias úteis. Sul e Centro-Oeste: 4 a 8 dias úteis. Norte e Nordeste: 6 a 12 dias úteis." },
        { h: "Transportadoras", p: "Trabalhamos com Correios (PAC e SEDEX) e transportadoras parceiras para entregas mais ágeis em capitais." },
        { h: "Frete grátis", p: "Pedidos acima de R$ 250 contam com frete grátis para todo o Brasil, no modalidade padrão." },
        { h: "Rastreamento", p: "Você recebe o código de rastreio por e-mail assim que o pedido é despachado." },
      ]} />
    </Layout>
  ),
});
