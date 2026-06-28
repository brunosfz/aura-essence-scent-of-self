import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { blogPosts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Diário Sensorial — AURA Essence" },
      { name: "description", content: "Conteúdos inspiradores sobre autocuidado, aromas, pele e bem-estar." },
      { property: "og:title", content: "Diário Sensorial — AURA" },
      { property: "og:description", content: "Inspirações para rituais de bem-estar." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = blogPosts;
  return (
    <Layout>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
          <p className="text-[11px] uppercase tracking-widest-2 text-primary">Diário sensorial</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Inspirações para os sentidos</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Ensaios, rituais e descobertas sobre aromas, pele e o cuidado como prática diária.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group block border-b border-border pb-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="aspect-[4/3] overflow-hidden rounded-sm bg-secondary">
              <div className="h-full w-full bg-gradient-to-br from-amber-soft/40 to-sage/30" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest-2 text-primary">{featured.category} · {featured.readTime}</p>
              <h2 className="mt-4 font-display text-4xl leading-tight transition-colors group-hover:text-primary md:text-5xl">{featured.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <p className="mt-6 text-xs uppercase tracking-widest-2 text-muted-foreground">{featured.date}</p>
            </div>
          </div>
        </Link>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br from-sand to-nude/60" />
              <p className="mt-4 text-[11px] uppercase tracking-widest-2 text-primary">{post.category} · {post.readTime}</p>
              <h3 className="mt-2 font-display text-2xl leading-snug transition-colors group-hover:text-primary">{post.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <p className="mt-4 text-xs uppercase tracking-widest-2 text-muted-foreground">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}