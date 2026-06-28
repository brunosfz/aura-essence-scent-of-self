import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — AURA Essence" }, { name: "description", content: "Tire suas dúvidas sobre produtos, pedidos, envio e cuidados AURA." }] }),
  component: FAQPage,
});

const faqs: { c: string; items: { q: string; a: string }[] }[] = [
  { c: "Pedidos", items: [
    { q: "Como acompanho meu pedido?", a: "Após a confirmação, você recebe um e-mail com o código de rastreio. Também é possível acompanhar pela sua conta na loja." },
    { q: "Posso alterar ou cancelar meu pedido?", a: "Sim, em até 2 horas após a confirmação, entrando em contato com nossa equipe pelo e-mail contato@auraessence.com." },
    { q: "Quais formas de pagamento aceitas?", a: "Cartões de crédito (até 6x sem juros), Pix com 5% de desconto e boleto bancário." },
  ]},
  { c: "Produtos", items: [
    { q: "Os produtos AURA são veganos?", a: "Sim. Todos os nossos produtos são livres de ingredientes de origem animal e não testados em animais." },
    { q: "Quanto tempo dura uma vela AURA?", a: "Nossas velas têm autonomia média de 35 a 50 horas, dependendo do tamanho e do uso. Apare o pavio antes de cada acendimento." },
    { q: "Posso usar o sabonete no rosto?", a: "Sim, nossos sabonetes são formulados com óleos vegetais suaves, indicados para corpo e rosto." },
  ]},
  { c: "Envio e trocas", items: [
    { q: "Qual o prazo de entrega?", a: "Sudeste: 3 a 6 dias úteis. Outras regiões: 5 a 12 dias úteis. Para pedidos acima de R$ 250, frete grátis." },
    { q: "Como funciona a troca?", a: "Você tem 7 dias após o recebimento para solicitar a troca. Veja todos os detalhes em nossa página de Trocas e Devoluções." },
  ]},
];

function FAQPage() {
  const [openIdx, setOpenIdx] = useState<string | null>("0-0");
  return (
    <Layout>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-10">
          <p className="text-[11px] uppercase tracking-widest-2 text-primary">Atendimento</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">Perguntas frequentes</h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">Reunimos as dúvidas mais comuns sobre nossos produtos, envios e cuidados.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        {faqs.map((cat, ci) => (
          <div key={cat.c} className="mb-12">
            <h2 className="mb-6 font-display text-3xl text-primary">{cat.c}</h2>
            <div className="divide-y divide-border border-y border-border">
              {cat.items.map((it, qi) => {
                const key = `${ci}-${qi}`;
                const open = openIdx === key;
                return (
                  <div key={it.q} className="py-5">
                    <button onClick={() => setOpenIdx(open ? null : key)} className="flex w-full items-center justify-between text-left">
                      <span className="font-display text-xl">{it.q}</span>
                      <span className="text-primary">{open ? "–" : "+"}</span>
                    </button>
                    {open && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}