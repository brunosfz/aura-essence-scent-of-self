import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const image2 = node.images.edges[1]?.node;
  const variant = node.variants.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant || !variant.availableForSale) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    setOpen(true);
  };

  return (
    <Link to="/produto/$handle" params={{ handle: node.handle }} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/50">
        {image && (
          <img src={image.url} alt={image.altText ?? node.title} loading="lazy" className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
        )}
        {image2 ? (
          <img src={image2.url} alt={image2.altText ?? node.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        ) : (
          image && <img src={image.url} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}

        <button onClick={handleAdd} disabled={isLoading || !variant?.availableForSale} className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 translate-y-3 rounded-full bg-foreground/90 px-5 py-3 text-[10px] font-medium uppercase tracking-widest-2 text-background opacity-0 backdrop-blur transition-all duration-300 hover:bg-primary group-hover:translate-y-0 group-hover:opacity-100 disabled:opacity-50">
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Adicionar"}
        </button>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest-2 text-muted-foreground">{node.productType || "AURA"}</p>
          <h3 className="mt-1 font-display text-lg leading-tight">{node.title}</h3>
        </div>
        <p className="text-sm font-medium text-foreground">{formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}</p>
      </div>
    </Link>
  );
}