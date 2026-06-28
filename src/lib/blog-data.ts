export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "rituais-de-autocuidado",
    title: "Rituais de autocuidado: pequenos gestos, grandes transformações",
    excerpt: "Aprenda a desenhar momentos diários que devolvem presença, calma e prazer ao seu corpo.",
    category: "Autocuidado",
    date: "12 de junho, 2026",
    readTime: "5 min",
    content: [
      "O autocuidado nasce nos detalhes. Acender uma vela ao chegar em casa, demorar-se no banho, escolher um aroma que acolhe o seu humor — são micro-rituais que, repetidos, reconstroem nossa relação com o corpo.",
      "Na AURA Essence, acreditamos que o ritual é uma forma de presença. Cada produto é desenhado para criar um momento — não apenas um efeito. Comece simples: três respirações antes de acender sua vela, um minuto de silêncio antes de tocar a pele com o sabonete.",
      "Com o tempo, esses gestos se tornam âncoras emocionais. Você começa a perceber que cuidar de si é também cuidar de tudo o que pulsa ao seu redor.",
    ],
  },
  {
    slug: "aromas-para-cada-momento",
    title: "Aromas para cada momento do seu dia",
    excerpt: "Lavanda ao amanhecer, âmbar ao crepúsculo: como escolher fragrâncias que conversam com o seu ritmo.",
    category: "Aromas",
    date: "28 de maio, 2026",
    readTime: "4 min",
    content: [
      "Os aromas têm tempo próprio. Eucalipto e bergamota despertam — perfeitos para o início do dia. Lavanda, sândalo e baunilha acalmam — ideais para a noite.",
      "Combinar fragrâncias é uma forma de costurar emoções. Experimente alternar entre famílias olfativas conforme o seu humor e observe como o ambiente responde.",
    ],
  },
  {
    slug: "pele-em-equilibrio",
    title: "Pele em equilíbrio: o poder dos óleos naturais",
    excerpt: "Por que um sabonete bem formulado pode mudar a forma como você sente sua própria pele.",
    category: "Pele",
    date: "14 de maio, 2026",
    readTime: "6 min",
    content: [
      "Nossos sabonetes nascem de uma base de óleos vegetais nobres — karité, coco, amêndoas doces. Eles não apenas higienizam: nutrem, protegem e perfumam delicadamente.",
      "Um ritual de banho consciente devolve à pele o que a rotina retira. Use água morna, massagens circulares e finalize sempre com uma camada de óleo ou hidratante.",
    ],
  },
  {
    slug: "ambiente-acolhedor",
    title: "Como transformar a casa em refúgio sensorial",
    excerpt: "Iluminação, textura e aroma: três camadas para um lar que abraça.",
    category: "Bem-estar",
    date: "30 de abril, 2026",
    readTime: "5 min",
    content: [
      "Casa é o cenário do nosso bem-estar. Quando alinhamos luz quente, tecidos naturais e um aroma assinatura, criamos um espaço que regula o sistema nervoso.",
      "Defina um aroma para cada cômodo. Velas no living, aromatizador no quarto, sabonetes especiais no lavabo. A consistência cria identidade.",
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}