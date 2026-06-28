import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Minus, Plus, Star } from "lucide-react";
import { Layout } from "@/components/aura/Layout";
import { ProductCard } from "@/components/aura/ProductCard";
import { fetchProductByHandle, fetchProducts, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const productQuery = (handle: string) =>
  queryOptions({
    queryKey: ["product", handle],
    queryFn: async () => {
      const product = await fetchProductByHandle(handle);
      if (!product) throw notFound();
      return product;
    },
  });

const relatedQuery = queryOptions({
  queryKey: ["products", "related"],
  queryFn: () => fetchProducts(undefined, 8),
});

export const Route = createFileRoute("/produto/$handle")({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(productQuery(params.handle));
    context.queryClient.ensureQueryData(relatedQuery);
  },
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle} — AURA Essence` },
      { property: "og:title", content: `${params.handle} — AURA Essence` },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Produto não encontrado</h1>
        <p className="mt-4 text-muted-foreground">Talvez ele tenha esgotado ou ainda esteja por chegar.</p>
        <Link to="/loja" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-[11px] uppercase tracking-widest-2 text-primary-foreground">
          Voltar para a loja
        </Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Algo aconteceu</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </Layout>
  ),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQuery(handle));
  const { data: related } = useSuspenseQuery(relatedQuery);

  const variants = product.variants.edges;
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  const variant = variants[variantIdx]?.node;
  const images = product.images.edges;
  const addItem = useCartStore((s) => s.addItem);
  const setOpenCart = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);

  const handleAdd = async () => {
    if (!variant?.availableForSale) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions ?? [],
    });
    setOpenCart(true);
  };

  const relatedFiltered = related.filter((p) => p.node.handle !== product.handle).slice(0, 4);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <nav className="mb-8 text-xs uppercase tracking-widest-2 text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">/</span>
          <Link to="/loja" className="hover:text-primary">Loja</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2">
          {/* GALERIA */}
          <div>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/50">
              {images[imgIdx] && (
                <img src={images[imgIdx].node.url} alt={images[imgIdx].node.altText ?? product.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button key={img.node.url} onClick={() => setImgIdx(i)} className={`aspect-square overflow-hidden rounded-sm border-2 transition ${i === imgIdx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <img src={img.node.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <p className="text-[11px] uppercase tracking-widest-2 text-primary">{product.productType || "AURA"}</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.title}</h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex gap-0.5 text-primary">
                {[0,0,0,0,0].map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
              </span>
              <span>Sem avaliações ainda</span>
            </div>
            <p className="mt-6 font-display text-3xl text-foreground">
              {variant ? formatPrice(variant.price.amount, variant.price.currencyCode) : "—"}
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            {variants.length > 1 && variants[0].node.title !== "Default Title" && (
              <div className="mt-8">
                <h4 className="mb-3 text-[11px] uppercase tracking-widest-2">Opção</h4>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button key={v.node.id} onClick={() => setVariantIdx(i)} className={`rounded-full border px-5 py-2 text-sm transition ${i === variantIdx ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center gap-3 rounded-full border border-border px-4">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-muted-foreground hover:text-primary"><Minus className="h-4 w-4" /></button>
                <span className="w-6 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="text-muted-foreground hover:text-primary"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={handleAdd} disabled={isLoading || !variant?.availableForSale} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-[11px] font-medium uppercase tracking-widest-2 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : variant?.availableForSale ? "Adicionar à sacola" : "Esgotado"}
              </button>
            </div>

            <div className="mt-12 divide-y divide-border border-y border-border text-sm">
              <Accordion title="Descrição sensorial" defaultOpen>
                <p>{product.description || "Aroma envolvente, presença marcante. Um convite ao silêncio e à contemplação."}</p>
              </Accordion>
              <Accordion title="Benefícios">
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Cria atmosfera acolhedora e relaxante</li>
                  <li>Fragrâncias autorais com longa duração</li>
                  <li>Ingredientes selecionados, livres de parabenos</li>
                </ul>
              </Accordion>
              <Accordion title="Modo de uso">
                <p>Use em ambientes ventilados. Mantenha longe de correntes de ar. Aproveite o ritual com presença plena.</p>
              </Accordion>
              <Accordion title="Composição">
                <p>Formulação à base de ingredientes naturais. Consulte o rótulo para a lista completa de componentes.</p>
              </Accordion>
              <Accordion title="Cuidados">
                <p>Mantenha em local fresco e seco, longe da luz direta. Aparar o pavio antes de cada uso (velas).</p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* AVALIACOES */}
        <section className="mt-24 border-t border-border pt-16">
          <h2 className="font-display text-3xl">Avaliações</h2>
          <div className="mt-6 rounded-sm border border-dashed border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">Ainda não há avaliações para este produto. Seja a primeira pessoa a compartilhar sua experiência.</p>
          </div>
        </section>

        {/* RELACIONADOS */}
        {relatedFiltered.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-3xl">Você também vai amar</h2>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFiltered.map((p) => <ProductCard key={p.node.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-4">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between text-left">
        <span className="font-display text-lg">{title}</span>
        <span className="text-muted-foreground">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  );
}