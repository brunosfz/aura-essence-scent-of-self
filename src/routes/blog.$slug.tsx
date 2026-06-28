import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/aura/Layout";
import { getPost, blogPosts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — AURA` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: PostPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Post não encontrado</h1>
        <Link to="/blog" className="mt-6 inline-block text-primary underline">Voltar ao diário</Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p>{error.message}</p>
      </div>
    </Layout>
  ),
});

function PostPage() {
  const post = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Link to="/blog" className="text-[11px] uppercase tracking-widest-2 text-muted-foreground hover:text-primary">← Diário sensorial</Link>
        <p className="mt-8 text-[11px] uppercase tracking-widest-2 text-primary">{post.category} · {post.readTime}</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-xs uppercase tracking-widest-2 text-muted-foreground">{post.date}</p>

        <div className="mt-12 aspect-[16/9] overflow-hidden rounded-sm bg-gradient-to-br from-amber-soft/40 to-sage/30" />

        <div className="prose prose-lg mt-12 space-y-6 text-foreground/90">
          {post.content.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed">{p}</p>
          ))}
        </div>
      </article>

      <section className="mx-auto max-w-7xl border-t border-border px-6 py-20 lg:px-10">
        <h2 className="font-display text-3xl">Continue lendo</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br from-sand to-nude/60" />
              <h3 className="mt-4 font-display text-xl group-hover:text-primary">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}