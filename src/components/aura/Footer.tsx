import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-1">
          <Logo className="h-12 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Cosméticos e bem-estar sensorial para rituais que cuidam por dentro e por fora.
          </p>
        </div>
        <FooterCol title="Loja" links={[
          { to: "/loja", label: "Todos os produtos" },
          { to: "/loja", label: "Velas aromáticas" },
          { to: "/loja", label: "Sabonetes" },
          { to: "/loja", label: "Aromatizadores" },
        ]} />
        <FooterCol title="A marca" links={[
          { to: "/sobre", label: "Sobre a AURA" },
          { to: "/blog", label: "Diário sensorial" },
          { to: "/faq", label: "Perguntas frequentes" },
        ]} />
        <FooterCol title="Atendimento" links={[
          { to: "/envio", label: "Prazos e envio" },
          { to: "/trocas", label: "Trocas e devoluções" },
          { to: "/privacidade", label: "Privacidade" },
          { to: "/termos", label: "Termos de uso" },
        ]} />
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted-foreground md:flex-row lg:px-10">
          <span>© {new Date().getFullYear()} AURA Essence. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="mailto:contato@auraessence.com" className="hover:text-primary">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-5 text-[11px] font-medium uppercase tracking-widest-2 text-foreground">{title}</h4>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link to={l.to} className="transition-colors hover:text-primary">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}