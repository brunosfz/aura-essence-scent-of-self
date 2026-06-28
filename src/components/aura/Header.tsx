import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "./CartDrawer";

const nav = [
  { to: "/", label: "Início" },
  { to: "/loja", label: "Loja" },
  { to: "/sobre", label: "Sobre" },
  { to: "/blog", label: "Diário" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center" aria-label="AURA Essence">
          <Logo className="h-9 w-auto md:h-11" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-[11px] font-medium uppercase tracking-widest-2 text-foreground/70 transition-colors hover:text-primary data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setCartOpen(true)} aria-label="Abrir carrinho" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="flex flex-col px-6 py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-sm uppercase tracking-widest-2 text-foreground/80">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <CartDrawer />
    </header>
  );
}