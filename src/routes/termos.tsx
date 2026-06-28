import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { LegalPage } from "@/components/aura/LegalPage";

export const Route = createFileRoute("/termos")({
  head: () => ({ meta: [{ title: "Termos de Uso — AURA Essence" }] }),
  component: () => (
    <Layout>
      <LegalPage title="Termos de Uso" updated="Vigentes a partir de junho de 2026" sections={[
        { h: "Aceitação dos termos", p: "Ao acessar e utilizar o site auraessence.com, você concorda com estes Termos de Uso e com nossa Política de Privacidade." },
        { h: "Cadastro", p: "Para realizar compras, você deve fornecer informações verdadeiras e completas. É de sua responsabilidade manter a confidencialidade da senha." },
        { h: "Propriedade intelectual", p: "Todo o conteúdo do site (textos, imagens, marcas, logotipos) é de propriedade da AURA Essence e protegido por leis de direitos autorais." },
        { h: "Limitação de responsabilidade", p: "Nos esforçamos para manter o site disponível, mas não nos responsabilizamos por interrupções decorrentes de manutenção, força maior ou eventos fora do nosso controle." },
        { h: "Foro", p: "Estes termos são regidos pelas leis do Brasil. Fica eleito o foro da comarca de São Paulo/SP para dirimir eventuais questões." },
      ]} />
    </Layout>
  ),
});
