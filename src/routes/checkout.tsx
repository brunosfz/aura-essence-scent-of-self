import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { Loader2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — AURA Essence" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, isLoading, getCheckoutUrl } = useCartStore();
  const subtotal = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "BRL";
  const shipping = subtotal >= 250 || subtotal === 0 ? 0 : 24.9;
  const total = subtotal + shipping;

  const goCheckout = () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
        <h1 className="font-display text-5xl md:text-6xl">Checkout</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Você será direcionada ao ambiente seguro da Shopify para concluir sua compra. Seus dados são criptografados de ponta a ponta.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-sm border border-dashed border-border bg-card p-16 text-center">
            <p className="font-display text-2xl">Sua sacola está vazia</p>
            <Link to="/loja" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-[11px] uppercase tracking-widest-2 text-primary-foreground">
              Explorar a loja
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_22rem]">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); goCheckout(); }}>
              <Section title="Contato">
                <Input label="E-mail" type="email" placeholder="voce@email.com" required />
              </Section>
              <Section title="Entrega">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Nome" required />
                  <Input label="Sobrenome" required />
                  <Input label="CEP" required />
                  <Input label="Cidade" required />
                  <Input label="Endereço" className="sm:col-span-2" required />
                  <Input label="Complemento" className="sm:col-span-2" />
                </div>
              </Section>
              <Section title="Pagamento">
                <p className="text-sm text-muted-foreground">
                  O pagamento é processado com segurança pela Shopify. Cartão, Pix e Boleto disponíveis.
                </p>
              </Section>
              <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-5 text-[11px] font-medium uppercase tracking-widest-2 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShieldCheck className="h-4 w-4" /> Finalizar compra com segurança</>}
              </button>
            </form>

            <aside className="self-start rounded-sm border border-border bg-card p-6">
              <h3 className="font-display text-2xl">Sua sacola</h3>
              <ul className="mt-5 space-y-4 text-sm">
                {items.map((it) => (
                  <li key={it.variantId} className="flex justify-between gap-3">
                    <span className="line-clamp-1">{it.product.node.title} × {it.quantity}</span>
                    <span>{formatPrice(parseFloat(it.price.amount) * it.quantity, it.price.currencyCode)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal, currency)}</dd></div>
                <div className="flex justify-between"><dt>Frete</dt><dd>{shipping === 0 ? "Grátis" : formatPrice(shipping, currency)}</dd></div>
              </dl>
              <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
                <span className="text-[11px] uppercase tracking-widest-2">Total</span>
                <span className="font-display text-2xl">{formatPrice(total, currency)}</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-2xl">{title}</h3>
      {children}
    </div>
  );
}
function Input({ label, className = "", ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11px] uppercase tracking-widest-2 text-muted-foreground">{label}</span>
      <input {...props} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" />
    </label>
  );
}