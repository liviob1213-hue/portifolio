/**
 * ============================================================
 *  CONTEÚDO DO PORTFÓLIO — EDITE SÓ ESTE ARQUIVO
 * ============================================================
 *  Tudo que aparece na página sai daqui.
 *  Campos marcados com "TODO:" são placeholders esperando você.
 */

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  /** Caminho do vídeo em /public/videos — ex: "/videos/projeto-01.mp4" */
  video: string;
  /** Imagem/print de capa em /public/posters (opcional) */
  poster?: string;
  /** Métricas / resultado. Deixe vazio para esconder. */
  tags: string[];
  href?: string;
};

export type Step = {
  id: string;
  label: string;
  title: string;
  text: string;
  meta: string;
};

export type Expertise = {
  id: string;
  title: string;
  text: string;
  bullets: string[];
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Partner = {
  name: string;
  /** Área da parceria. Deixe vazio para esconder a linha. */
  role?: string;
  monogram: string;
  /** Uma frase sobre o que a parceria faz. Deixe vazio para esconder. */
  note?: string;
  href?: string;
};

export const site = {
  name: "Farid Builder",
  /** Aparece gigante na abertura, no rodapé e na faixa final */
  brand: "VIBE CODER",
  role: "Desenvolvedor de soluções sob medida · 360°",
  location: "Brasil",
  email: "victor.faridoff@gmail.com",
  whatsapp: "https://wa.me/5531981096698",
  whatsappLabel: "+55 (31) 98109-6698",
  instagram: "https://www.instagram.com/farid_builder26/",
  instagramLabel: "@farid_builder26",
  /** Quando você criar, preencha aqui — o link só aparece se estiver preenchido. */
  linkedin: "",
  github: "",

  /** Frase do hero — aparece em blocos animados */
  hero: {
    kicker: "Vibe coder · desde 2022",
    lines: ["Eu não escrevo código", "para impressionar.", "Eu escrevo código", "para resolver."],
    sub: "Comecei vendendo nutra para fora do Brasil, sem saber programar. A dor virou sistema — e o sistema virou estrutura. Hoje construo soluções B2B de ponta a ponta: do cardápio digital ao agente de WhatsApp com automação e integração.",
    scrollHint: "role para entrar",
  },

  /** Marquee de abertura */
  marquee: [
    "PÁGINAS DE VENDA",
    "AUTOMAÇÃO",
    "AGENTES DE WHATSAPP",
    "INTEGRAÇÃO",
    "SITES",
    "B2B",
    "SOB MEDIDA",
    "CARDÁPIO DIGITAL",
  ],

  /** Sua foto — troque o arquivo em /public/images */
  photo: {
    portrait: "/images/retrato.jpg",
    caption: "quem escreve este código",
    /** Rótulos do card que vira (frente -> verso) */
    flipHint: "passe o mouse e clique",
    flipBackHint: "clique para voltar",
    flipBackTitle: "Especialidades",
  },

  /** Manifesto — texto grande com reveal palavra por palavra */
  manifesto: {
    label: "Quem sou",
    title:
      "Sou um vibe coder. Não vim da faculdade — vim da dor de vender no escuro e precisar de uma solução que não existia.",
    paragraphs: [
      "Há 4 anos comecei no nutra, vendendo para a gringa. Sem equipe, sem código, sem atalho. Quando bati numa dificuldade que travava a operação, fiz o que a maioria não faz: criei a solução. Sem saber programar.",
      "Isso virou hábito. Hoje tenho soluções validadas, páginas de venda no ar, sites profissionais e R$16K faturados na Kiwify como prova — não como discurso.",
      "Trabalho 360 graus no desenvolvimento. Não vendo pacote pronto: entendo a dor do cliente, desenho a solução, precifico justo para os dois lados e entrego algo que caiba no bolso dele e no crescimento dele. Foco em B2B, com aprimoramento da área em destaque.",
      "Do site ou cardápio simples até uma estrutura completa com automação, integração e agentes de WhatsApp — tudo para economizar tempo e poupar dinheiro.",
    ],
    closing: "Ferramenta boa é a que resolve o problema de hoje e não vira dívida amanhã.",
  },

  /** Trajetória — timeline horizontal pinada */
  trajectoryLabel: "Trajetória",
  trajectoryTitle: "4 anos, do zero à estrutura",
  steps: [
    {
      id: "t1",
      label: "01 · Origem",
      title: "A dor no nutra",
      text: "Vendendo nutra para fora do Brasil, sozinho. Sem programador, sem agência, sem orçamento para nenhum dos dois.",
      meta: "2022",
    },
    {
      id: "t2",
      label: "02 · Virada",
      title: "Criei a solução sem saber programar",
      text: "A dificuldade que me travava virou projeto. Montei a primeira solução na marra, estudando no meio do caminho. Funcionou — e mudou o que eu acreditava ser possível.",
      meta: "2022 — 2023",
    },
    {
      id: "t3",
      label: "03 · Validação",
      title: "Soluções validadas e R$16K na Kiwify",
      text: "Páginas de venda que convertem, sites profissionais entregues e faturamento real registrado. Aprender no escuro deu lugar a resultado medido.",
      meta: "2024",
    },
    {
      id: "t4",
      label: "04 · Escala",
      title: "360 graus em desenvolvimento",
      text: "Saí do produto único. Hoje entrego ponta a ponta: site, página, automação, integração e agentes de WhatsApp dentro da mesma estrutura.",
      meta: "2025",
    },
    {
      id: "t5",
      label: "05 · Foco",
      title: "B2B sob medida",
      text: "Solução baseada na dor do cliente, personalizada, com preço justo para os dois lados. Aprimoramento contínuo da área em destaque.",
      meta: "agora",
    },
  ] satisfies Step[],

  /** Números */
  statsLabel: "Prova, não promessa",
  stats: [
    { value: 16, prefix: "R$ ", suffix: "K", label: "faturados na Kiwify" },
    { value: 4, suffix: " anos", label: "construindo soluções" },
    { value: 360, suffix: "°", label: "de entrega em desenvolvimento" },
    { value: 100, suffix: "%", label: "sob medida, nada de pacote" },
  ] satisfies Stat[],

  /** Projetos — troque os caminhos dos vídeos em /public/videos */
  projectsLabel: "Projetos",
  projectsTitle: "O que eu construo",
  projectsIntro:
    "Cada projeto nasceu de uma dor real e específica. Passe o mouse para dar play — os vídeos rodam direto no navegador.",
  projects: [
    {
      id: "p1",
      index: "01",
      title: "Páginas de Venda",
      category: "Conversão",
      year: "2024",
      summary:
        "Estrutura de oferta, prova, objeção e fechamento. Feita para vender no tráfego pago e aguentar volume.",
      video: "/videos/projeto-01.mp4",
      poster: "/posters/projeto-01.svg",
      tags: ["Copy + estrutura", "Alta conversão", "Integração com checkout"],
    },
    {
      id: "p2",
      index: "02",
      title: "Sites Profissionais",
      category: "Presença",
      year: "2025",
      summary:
        "Sites institucionais com identidade forte, performance e SEO técnico. A casa digital da empresa, não um folheto.",
      video: "/videos/projeto-02.mp4",
      poster: "/posters/projeto-02.svg",
      tags: ["Performance", "SEO técnico", "Design sob medida"],
    },
    {
      id: "p3",
      index: "03",
      title: "Cardápios Digitais",
      category: "Operação",
      year: "2025",
      summary:
        "Menu digital com pedido direto no WhatsApp. Reduz fricção, elimina telefone ocupado e organiza a cozinha.",
      video: "/videos/projeto-03.mp4",
      poster: "/posters/projeto-03.svg",
      tags: ["Pedido no WhatsApp", "Mobile first", "Sem comissão de app"],
    },
    {
      id: "p4",
      index: "04",
      title: "Automação & Integração",
      category: "Estrutura",
      year: "2025",
      summary:
        "Sistemas que conversam entre si: formulário, CRM, planilha, financeiro, notificação. Zero trabalho manual repetido.",
      video: "/videos/projeto-04.mp4",
      poster: "/posters/projeto-04.svg",
      tags: ["APIs", "Webhooks", "Rotinas automáticas"],
    },
    {
      id: "p5",
      index: "05",
      title: "Agentes de WhatsApp",
      category: "Atendimento",
      year: "2026",
      summary:
        "Agentes treinados no contexto do negócio: qualificam, respondem, agendam e passam para humano na hora certa.",
      video: "/videos/projeto-05.mp4",
      poster: "/posters/projeto-05.svg",
      tags: ["Qualificação", "24/7", "Handoff humano"],
    },
    {
      id: "p6",
      index: "06",
      title: "Estrutura 360°",
      category: "Completo",
      year: "2026",
      summary:
        "Site, venda, atendimento e automação na mesma engrenagem. O projeto que junta tudo e roda sozinho.",
      video: "/videos/projeto-06.mp4",
      poster: "/posters/projeto-06.svg",
      tags: ["Ponta a ponta", "Escalável", "Documentado"],
    },
  ] as Project[],

  /** Especialidades */
  expertiseLabel: "Especialidades",
  expertiseTitle: "Onde eu sou forte",
  expertise: [
    {
      id: "e1",
      title: "Solução baseada na dor",
      text: "Nada começa por tecnologia. Começa por entender o gargalo real do negócio — o que trava, o que custa caro e o que ninguém aguenta mais fazer na mão.",
      bullets: ["Diagnóstico antes do orçamento", "Escopo enxuto", "Foco no que gera retorno"],
    },
    {
      id: "e2",
      title: "Preço justo para os dois lados",
      text: "Personalizado para caber no bolso do cliente e ser sustentável para mim. Sem inflar escopo, sem entregar gambiarra que vira dívida.",
      bullets: ["Escopo por fases", "Sem surpresa na fatura", "Entrega que dá manutenção"],
    },
    {
      id: "e3",
      title: "Automação e integração",
      text: "Conectar o que já existe e automatizar o repetitivo. É aqui que o cliente sente o dinheiro voltando para o caixa.",
      bullets: ["APIs e webhooks", "Rotinas agendadas", "Dados em um só lugar"],
    },
    {
      id: "e4",
      title: "Agentes de WhatsApp",
      text: "Atendimento que não dorme, responde em segundos e qualifica antes de chegar em você. Feito no contexto da sua operação, não genérico.",
      bullets: ["Treinado no seu negócio", "Qualifica e agenda", "Passa para humano quando precisa"],
    },
    {
      id: "e5",
      title: "Foco B2B",
      text: "Trabalho com empresas que precisam de estrutura, não de enfeite. Decisão rápida, linguagem direta, resultado medido.",
      bullets: ["Processos claros", "Comunicação direta", "Métricas combinadas"],
    },
    {
      id: "e6",
      title: "Aprimoramento em destaque",
      text: "Projeto que não melhora, morre. Toda entrega deixa uma trilha de evolução: o que medir, o que ajustar, o que escalar depois.",
      bullets: ["Iteração contínua", "Melhoria guiada por dados", "Roadmap de evolução"],
    },
  ] satisfies Expertise[],

  /** IAs que você acessa — edite a lista livremente */
  aiLabel: "Stack de IA",
  aiTitle: "Tenho acesso às melhores IAs",
  aiIntro:
    "IA não é o produto — é a alavanca. Uso essas ferramentas para construir mais rápido, testar mais e entregar com um padrão que sozinho levaria meses.",
  aiTools: [
    "Claude",
    "ChatGPT",
    "Gemini",
    "Grok",
    "Cursor",
    "v0",
    "Lovable",
    "Midjourney",
    "ElevenLabs",
    "n8n",
  ],

  /** Parcerias e sociedades */
  partnersLabel: "Parcerias & Sociedades",
  partnersTitle: "Quem constrói comigo",
  partnersIntro:
    "Projetos grandes não saem sozinhos. Estas são as parcerias e sociedades que sustentam a operação.",
  /** TODO: me diga a área de cada um (ex: "Sociedade · Tráfego") que eu preencho. */
  partners: [
    { name: "Paulo Costa", role: "Sociedade & parceria", monogram: "PC" },
    { name: "Isaias Ama", role: "Sociedade & parceria", monogram: "ISA" },
    { name: "Carlos Murta", role: "Sociedade & parceria", monogram: "CM" },
    { name: "Silvio Nobrega", role: "Sociedade & parceria", monogram: "SN" },
  ] as Partner[],

  /** Processo — cards que empilham no scroll */
  processLabel: "Método",
  processTitle: "Como eu trabalho",
  process: [
    {
      id: "m1",
      label: "Etapa 01",
      title: "Ouvir a dor",
      text: "Conversa direta para achar o gargalo. O que consome tempo, o que custa dinheiro, o que é feito na mão e não deveria mais.",
      meta: "Diagnóstico",
    },
    {
      id: "m2",
      label: "Etapa 02",
      title: "Desenhar a solução",
      text: "Desenho a estrutura antes de escrever código: o que entra, o que sai, o que automatiza e o que fica fora do escopo.",
      meta: "Arquitetura",
    },
    {
      id: "m3",
      label: "Etapa 03",
      title: "Construir e integrar",
      text: "Desenvolvimento com IA como alavanca de velocidade. Integro com o que você já usa — nada de começar do zero por vaidade.",
      meta: "Execução",
    },
    {
      id: "m4",
      label: "Etapa 04",
      title: "Medir e aprimorar",
      text: "Entrego funcionando, com o que medir combinado. Depois vem a fase de aprimoramento — que é onde o resultado escala.",
      meta: "Evolução",
    },
  ] satisfies Step[],

  /** Fechamento */
  contactLabel: "Próximo passo",
  contactTitle: "Tem uma dor que trava seu negócio?",
  contactText:
    "Me conta o problema, não o layout. Eu volto com uma estrutura, um escopo e um preço justo para os dois lados.",
  contactCta: "Falar no WhatsApp",

  footerNote: "Feito à mão, com IA como alavanca.",
};
