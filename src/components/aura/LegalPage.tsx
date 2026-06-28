export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <p className="text-[11px] uppercase tracking-widest-2 text-primary">Atendimento</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">{title}</h1>
          <p className="mt-5 text-sm text-muted-foreground">{updated}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        {sections.map((s) => (
          <div key={s.h} className="mb-10">
            <h2 className="font-display text-2xl text-primary">{s.h}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </section>
    </>
  );
}