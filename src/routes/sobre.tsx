import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { SectionTitle } from "@/components/aura/SectionTitle";
import aboutImg from "@/assets/about.jpg";
import ritualImg from "@/assets/ritual.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a AURA — Marca de cosméticos sensoriais" },
      { name: "description", content: "A história, o conceito e os valores por trás da AURA Essence: cosméticos e bem-estar que cuidam dos sentidos." },
      { property: "og:title", content: "Sobre a AURA" },
      { property: "og:description", content: "Cuidar é um gesto sagrado." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
          <p className="text-[11px] uppercase tracking-widest-2 text-primary">A marca</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl">
            Cuidar é um <em className="not-italic text-primary">gesto sagrado</em>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A AURA Essence nasce do desejo de devolver ao cotidiano a delicadeza dos pequenos rituais — aqueles que reorganizam o corpo, perfumam a casa e ancoram a presença.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="aspect-[5/6] overflow-hidden rounded-sm">
            <img src={aboutImg} alt="Universo AURA Essence" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionTitle eyebrow="Nossa história" title="De uma cozinha caseira para a sua casa" />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>A AURA começou pequena — em uma cozinha onde fragrâncias eram testadas a colher, pavios eram cortados à mão e cada barra de sabonete carregava o cuidado de quem entende que cosmético não é luxo: é colo.</p>
              <p>Hoje continuamos artesãs em essência. Cada coleção AURA é desenhada com lentidão, ingredientes naturais e a intenção de criar experiências sensoriais memoráveis.</p>
              <p>Nosso compromisso é simples: produtos que cuidam de você sem agredir o planeta. Embalagens reaproveitáveis, fórmulas livres de crueldade, e uma cadeia produtiva que respeita as mãos que fazem.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle eyebrow="Nossos valores" title="O que move a AURA" align="center" />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { t: "Presença", d: "Acreditamos que estar inteira no instante é a forma mais profunda de cuidado." },
              { t: "Beleza honesta", d: "Fórmulas claras, ingredientes que reconhecemos, transparência radical no rótulo." },
              { t: "Lentidão", d: "Pequenas tiragens, fabricação artesanal, respeito pelo tempo das mãos que fazem." },
            ].map((v) => (
              <div key={v.t} className="rounded-sm border border-border bg-card p-10">
                <h3 className="font-display text-2xl text-primary">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionTitle eyebrow="Conceito" title="Aroma como linguagem afetiva" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Cada fragrância AURA é composta como uma carta: tem abertura, corpo e fundo. Bergamota e capim-limão abrem; sálvia e rosa formam o coração; sândalo e âmbar sustentam.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Acreditamos que o olfato é a memória mais íntima. Quando você acende uma vela ou abre uma barra de sabonete, está escolhendo qual lembrança quer guardar deste momento.
            </p>
            <Link to="/loja" className="mt-8 inline-flex rounded-full bg-primary px-7 py-4 text-[11px] uppercase tracking-widest-2 text-primary-foreground">
              Conhecer os produtos
            </Link>
          </div>
          <div className="aspect-[5/6] overflow-hidden rounded-sm">
            <img src={ritualImg} alt="Ritual sensorial" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </Layout>
  );
}