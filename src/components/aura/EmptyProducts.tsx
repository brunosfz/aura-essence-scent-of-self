import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function EmptyProducts({ message }: { message?: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-sm border border-dashed border-border bg-card px-8 py-16 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="font-display text-2xl">Nenhum produto por aqui ainda</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {message ?? "Estamos preparando os primeiros rituais sensoriais. Em breve, suas velas, sabonetes e aromatizadores AURA estarão disponíveis."}
      </p>
      <Link to="/sobre" className="mt-6 inline-block text-xs uppercase tracking-widest-2 text-primary underline-offset-4 hover:underline">
        Conheça a marca
      </Link>
    </div>
  );
}