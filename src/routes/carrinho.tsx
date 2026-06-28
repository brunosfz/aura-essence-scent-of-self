import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, fetchProducts } from "@/lib/shopify";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/aura/ProductCard";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Sacola — AURA Essence" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, isLoading, updateQuantity, removeItem, getCheckoutUrl } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [suggestion, setSuggestion] = useState<Awaited<ReturnType<typeof fetchProducts>>>([]);

  useEffect(() => {
    fetchProducts(undefined, 4).then(setSuggestion).catch(() => {});
  }, []);

  const subtotal = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "BRL";
  const shipping = subtotal >= 250 || subtotal === 0 ? 0 : 24.9;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <h1 className="font-display text-5xl md:text-6xl">Sua sacola</h1>
        <p className="mt-3 text-muted-foreground">Revise seu ritual antes do checkout.</p>

        {items.length === 0 ? (
          <div className="mt-16 rounded-sm border border-dashed border-border bg-card p-16 text-center">
            <p className="font-display text-2xl">Sua sacola está vazia</p>
            <p className="mt-3 text-muted-foreground">Comece explorando a coleção AURA.</p>
            <Link to="/loja" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-[11px] uppercase tracking-widest-2 text-primary-foreground">
              Ir para a loja
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem]">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-6 py-6">
                  <div className="h-32 w-28 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img src={item.product.node.images.edges[0].node.url} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest-2 text-muted-foreground">{item.product.node.productType || "AURA"}</p>
                        <h3 className="mt-1 font-display text-2xl">{item.product.node.title}</h3>
                      </div>
                      <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-primary"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div className="flex items-center gap-3 rounded-full border border-border px-4 py-1">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <p className="font-display text-xl">{formatPrice(parseFloat(item.price.amount) * item.quantity, item.price.currencyCode)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="self-start rounded-sm border border-border bg-card p-6">
              <h3 className="font-display text-2xl">Resumo</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal, currency)}</dd></div>
                <div className="flex justify-between"><dt>Frete</dt><dd>{shipping === 0 ? "Grátis" : formatPrice(shipping, currency)}</dd></div>
              </dl>
              <div className="mt-5 border-t border-border pt-5">
                <label className="text-[11px] uppercase tracking-widest-2 text-muted-foreground">Cupom de desconto</label>
                <div className="mt-2 flex gap-2">
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="AURA10" className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary" />
                  <button className="rounded-full bg-foreground px-5 py-2 text-[11px] uppercase tracking-widest-2 text-background">Aplicar</button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Cupons são aplicados no checkout.</p>
              </div>
              <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
                <span className="text-[11px] uppercase tracking-widest-2">Total</span>
                <span className="font-display text-3xl">{formatPrice(total, currency)}</span>
              </div>
              <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-[11px] font-medium uppercase tracking-widest-2 text-primary-foreground transition-opacity hover:opacity-90">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ir para o checkout"}
              </Link>
              <button
                onClick={() => {
                  const url = getCheckoutUrl();
                  if (url) window.open(url, "_blank");
                }}
                className="mt-2 w-full text-center text-xs uppercase tracking-widest-2 text-muted-foreground hover:text-primary"
              >
                Checkout direto Shopify →
              </button>
            </aside>
          </div>
        )}

        {suggestion.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-3xl">Complete o seu ritual</h2>
            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {suggestion.slice(0, 4).map((p) => <ProductCard key={p.node.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}