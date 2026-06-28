import { Loader2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, isLoading, isSyncing, setOpen, updateQuantity, removeItem, syncCart, getCheckoutUrl } = useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "BRL";

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h3 className="font-display text-2xl">Sua sacola</h3>
            <p className="text-xs text-muted-foreground">
              {totalQty === 0 ? "Vazia por enquanto" : `${totalQty} ${totalQty === 1 ? "item" : "itens"}`}
            </p>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Sua sacola está esperando por um ritual.</p>
              <Link to="/loja" onClick={() => setOpen(false)} className="mt-6 text-xs uppercase tracking-widest-2 text-primary underline-offset-4 hover:underline">
                Explorar a loja
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <h4 className="font-display text-lg leading-tight">{item.product.node.title}</h4>
                      <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-primary" aria-label="Remover">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {item.selectedOptions.length > 0 && item.selectedOptions[0].value !== "Default Title" && (
                      <p className="mt-1 text-xs text-muted-foreground">{item.selectedOptions.map((o) => o.value).join(" • ")}</p>
                    )}
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="text-muted-foreground hover:text-primary">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="text-muted-foreground hover:text-primary">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(parseFloat(item.price.amount) * item.quantity, item.price.currencyCode)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-secondary/30 px-6 py-5">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-widest-2 text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl">{formatPrice(subtotal, currency)}</span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">Frete e impostos calculados no checkout.</p>
            <button onClick={checkout} disabled={isLoading || isSyncing} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-[11px] font-medium uppercase tracking-widest-2 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
              {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finalizar compra"}
            </button>
            <Link to="/carrinho" onClick={() => setOpen(false)} className="mt-3 block text-center text-xs uppercase tracking-widest-2 text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
              Ver sacola completa
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}