import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, PackageCheck, Sparkles, Truck } from "lucide-react";
import { Layout } from "@/components/aura/Layout";
import { SectionTitle } from "@/components/aura/SectionTitle";
import { ProductCard } from "@/components/aura/ProductCard";
import { EmptyProducts } from "@/components/aura/EmptyProducts";
import { fetchProducts } from "@/lib/shopify";
import heroImg from "@/assets/hero.jpg";
import candlesImg from "@/assets/collection-candles.jpg";
import soapsImg from "@/assets/collection-soaps.jpg";
import diffusersImg from "@/assets/collection-diffusers.jpg";
import ritualImg from "@/assets/ritual.jpg";

const productsQuery = queryOptions({
  queryKey: ["products", "home"],
  queryFn: () => fetchProducts(undefined, 8),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA Essence — Rituais sensoriais de autocuidado" },
      { name: "description", content: "Velas aromáticas, sabonetes em barra e aromatizadores que transformam sua casa em refúgio." },
      { property: "og:title", content: "AURA Essence — Rituais sensoriais de autocuidado" },
      { property: "og:description", content: "Velas, sabonetes e aromatizadores feitos para cuidar dos sentidos." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery);
  },
  component: Index,
});

function Index() {
  const { data: products } = useSuspenseQuery(productsQuery);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 md:grid-cols-2 md:items-center md:gap-16 md:pb-28 md:pt-20 lg:px-10">
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-widest-2 text-primary">Coleção AURA · Edição inaugural</p>
            <h1 className="font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
              Cuidar de si <em className="not-italic text-primary">é</em> um gesto sagrado.
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              Velas, sabonetes e aromatizadores artesanais que transformam o cotidiano em ritual.
              Aromas que acolhem. Texturas que abraçam. Pequenos atos de presença.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/loja" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-[11px] font-medium uppercase tracking-widest-2 text-primary-foreground transition-opacity hover:opacity-90">
                Explorar a loja <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/sobre" className="inline-flex items-center rounded-full border border-foreground/20 px-7 py-4 text-[11px] font-medium uppercase tracking-widest-2 text-foreground transition-colors hover:border-primary hover:text-primary">
                A filosofia AURA
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={heroImg} alt="Coleção AURA Essence" width={1920} height={1280} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-full bg-accent/40 blur-3xl md:block" />
          </div>
        </div>
      </section>

      {/* COLECOES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionTitle eyebrow="Nossas coleções" title={<>Três famílias, <em className="not-italic text-primary">um único acolhimento</em>.</>} description="Cada produto AURA nasce para participar de um momento. Escolha pelo aroma, pelo gesto ou pela emoção que você deseja convocar." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <CollectionCard image={candlesImg} title="Velas Aromáticas" desc="Cera vegetal, pavio de algodão, fragrâncias autorais." />
          <CollectionCard image={soapsImg} title="Sabonetes em Barra" desc="Óleos vegetais, manteigas naturais, espuma cremosa." />
          <CollectionCard image={diffusersImg} title="Aromatizadores" desc="Difusão lenta para perfumar cantos da sua casa." />
        </div>
        <div className="mt-10 flex items-center justify-between rounded-sm border border-dashed border-border bg-secondary/40 px-6 py-5 text-sm text-muted-foreground">
          <span><span className="mr-2 text-[10px] uppercase tracking-widest-2 text-primary">Em breve</span> Escalda-pés AURA — o ritual de fechar o dia pelos pés.</span>
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-12 flex items-end justify-between">
          <SectionTitle eyebrow="Mais desejados" title="Favoritos da casa" />
          <Link to="/loja" className="hidden text-[11px] uppercase tracking-widest-2 text-primary underline-offset-4 hover:underline md:inline-flex">
            Ver toda a loja →
          </Link>
        </div>
        {products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>

      {/* RITUAL */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center lg:px-10">
          <div className="aspect-[4/5] overflow-hidden rounded-sm md:aspect-[5/6]">
            <img src={ritualImg} alt="Ritual de autocuidado AURA" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionTitle eyebrow="Ritual sensorial" title={<>Devolva ao seu dia <em className="not-italic text-primary">o tempo das pequenas coisas</em>.</>} description="Acender, respirar, ensaboar, hidratar. AURA é um convite a desacelerar — porque o cuidado começa quando a gente decide estar inteira no instante." />
            <div className="mt-10 space-y-5">
              {[
                { n: "01", t: "Prepare o espaço", d: "Luz baixa, música suave, uma vela acesa." },
                { n: "02", t: "Demore-se no toque", d: "Massagem circular com sabonete em pele molhada." },
                { n: "03", t: "Sele com aroma", d: "Borrife o ambiente e respire fundo três vezes." },
              ].map((s) => (
                <div key={s.n} className="flex gap-5 border-t border-border pt-5">
                  <span className="font-display text-2xl text-primary">{s.n}</span>
                  <div>
                    <h4 className="font-display text-xl">{s.t}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionTitle eyebrow="Por dentro da AURA" title="Cuidado em cada detalhe" align="center" />
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          {[
            { icon: Leaf, t: "Ingredientes naturais", d: "Óleos vegetais, ceras puras e fragrâncias autorais." },
            { icon: PackageCheck, t: "Embalagem consciente", d: "Vidro reutilizável e papéis FSC certificados." },
            { icon: Sparkles, t: "Feito à mão", d: "Pequenas tiragens com olhar artesanal." },
            { icon: Truck, t: "Envio para todo o Brasil", d: "Frete grátis em pedidos acima de R$ 250." },
          ].map((b) => (
            <div key={b.t} className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary">
                <b.icon className="h-5 w-5" />
              </div>
              <h4 className="font-display text-xl">{b.t}</h4>
              <p className="mx-auto mt-2 max-w-[14rem] text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-accent/15 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle eyebrow="Quem vive a AURA" title="Histórias que respiram" align="center" />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { q: "A vela da AURA virou meu ritual de fim de tarde. Acendo, respiro, e o dia se reorganiza.", a: "Marina, São Paulo" },
              { q: "O sabonete de aveia e mel deixou minha pele macia como há anos não sentia. E o cheiro… um sonho.", a: "Beatriz, Curitiba" },
              { q: "O aromatizador de sálvia transformou meu home office num lugar onde eu quero ficar.", a: "Helena, Belo Horizonte" },
            ].map((d) => (
              <figure key={d.a} className="rounded-sm border border-border bg-card p-8">
                <blockquote className="font-display text-xl leading-snug text-foreground">"{d.q}"</blockquote>
                <figcaption className="mt-6 text-[11px] uppercase tracking-widest-2 text-muted-foreground">— {d.a}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center lg:px-10">
        <h2 className="font-display text-4xl leading-tight md:text-6xl">
          Comece o seu ritual <em className="not-italic text-primary">hoje</em>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          Descubra a coleção AURA Essence e leve para casa pequenos gestos de cuidado.
        </p>
        <Link to="/loja" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-[11px] font-medium uppercase tracking-widest-2 text-primary-foreground transition-opacity hover:opacity-90">
          Visitar a loja <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </Layout>
  );
}

function CollectionCard({ image, title, desc }: { image: string; title: string; desc: string }) {
  return (
    <Link to="/loja" className="group block">
      <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
        <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-5">
        <h3 className="font-display text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}
