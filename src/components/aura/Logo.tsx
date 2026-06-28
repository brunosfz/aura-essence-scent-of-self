import logo from "@/assets/aura-logo.png.asset.json";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={logo.url} alt="AURA Essence" className={className} />;
}