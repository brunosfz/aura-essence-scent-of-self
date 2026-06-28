import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Layout } from "@/components/aura/Layout";
import { ProductCard } from "@/components/aura/ProductCard";
import { EmptyProducts } from "@/components/aura/EmptyProducts";
import { fetchProducts } from "@/lib/shopify";

const shopQuery = queryOptions({
  queryKey: ["products", "shop"],
  queryFn: () => fetchProducts(undefined, 100),
});

export const Route = createFileRoute("/loja")({
  head: () => ({
    meta: [
      { title: "Loja — AURA Essence" },
      { name: "description", content: "Velas aromáticas, sabonetes em barra e aromatizadores de ambiente artesanais AURA Essence." },
      { property: "og:title", content: "Loja — AURA Essence" },
      { property: "og:description", content: "Velas, sabonetes e aromatizadores AURA." },
    ],
  }),
  loader: ({ context }) => { context.queryClient.ensureQueryData(shopQuery); },
  component: ShopPage,
});

const TIPOS = ["Todos", "Velas", "Sabonetes", "Aromatizadores"];
const OCASIOES = ["Todas", "Manhã", "Banho", "Noite", "Trabalho"];
const FAIXAS = [
  { label: "Todos os preços", min: 0, max: Infinity },
  { label: "Até R$ 80", min: 0, max: 80 },
  { label: "R$ 80 – R$ 160", min: 80, max: 160 },
  { label: "Acima de R$ 160", min: 160, max: Infinity },
];

function ShopPage() {
  const { data: products } = useSuspenseQuery(shopQuery);
  const [tipo, setTipo] = useState("Todos");
  const [aroma, setAroma] = useState("Todos");
  const [ocasiao, setOcasiao] = useState("Todas");
  const [faixa, setFaixa] = useState(0);

  const aromas = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.node.tags?.forEach((t) => t.toLowerCase().startsWith("aroma:") && set.add(t.replace(/aroma:/i, "").trim())));
    return ["Todos", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const node = p.node;
      if (tipo !== "Todos" && !(node.productType ?? "").toLowerCase().includes(tipo.toLowerCase())) return false;
      if (aroma !== "Todos" && !node.tags?.some((t) => t.toLowerCase() === `aroma:${aroma.toLowerCase()}`)) return false;
      if (ocasiao !== "Todas" && !node.tags?.some((t) => t.toLowerCase() === `ocasiao:${ocasiao.toLowerCase()}`)) return false;
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      const range = FAIXAS[faixa];
      if (price < range.min || price > range.max) return false;
      return true;
    });
  }, [products, tipo, aroma, ocasiao, faixa]);

  return (
    <Layout>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <p className="text-[11px] uppercase tracking-widest-2 text-primary">Loja AURA</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">A coleção completa</h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Velas, sabonetes e aromatizadores reunidos em um só lugar. Filtre por aroma, ocasião ou tipo de produto.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-8">
            <Filter label="Tipo" options={TIPOS} value={tipo} onChange={setTipo} />
            <Filter label="Aroma" options={aromas} value={aroma} onChange={setAroma} />
            <Filter label="Ocasião" options={OCASIOES} value={ocasiao} onChange={setOcasiao} />
            <div>
              <h4 className="mb-3 text-[11px] uppercase tracking-widest-2 text-foreground">Preço</h4>
              <div className="space-y-2">
                {FAIXAS.map((f, idx) => (
                  <button key={f.label} onClick={() => setFaixa(idx)} className={`block w-full text-left text-sm ${idx === faixa ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <p className="mb-8 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "produto" : "produtos"}</p>
            {filtered.length === 0 ? (
              products.length === 0 ? (
                <EmptyProducts />
              ) : (
                <EmptyProducts message="Nenhum produto encontrado com esses filtros. Ajuste suas escolhas para ver mais opções." />
              )
            ) : (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.node.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Filter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h4 className="mb-3 text-[11px] uppercase tracking-widest-2 text-foreground">{label}</h4>
      <div className="space-y-2">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)} className={`block w-full text-left text-sm ${o === value ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}