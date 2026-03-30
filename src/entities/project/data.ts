import type { Project } from "./model";

import imgHappy from "@/shared/assets/projects/Happy.webp";
import imgEcoCash from "@/shared/assets/projects/EcoCash.webp";
import imgNearby from "@/shared/assets/projects/Nearby.webp";
import imgTuxLetter from "@/shared/assets/projects/TuxLetter.webp";
import imgOpenPilot from "@/shared/assets/projects/OpenPilot.webp";
import imgGitPulse from "@/shared/assets/projects/GitPulse.webp";
import imgCodewhisper from "@/shared/assets/projects/Codewhisper.webp";
import imgBlogManager from "@/shared/assets/projects/BlogManager.webp";
import imgPaint from "@/shared/assets/projects/Paint.webp";
import imgSalottiRun from "@/shared/assets/projects/SalottiRun.webp";
import imgLetmeask from "@/shared/assets/projects/Letmeask.webp";
import imgMoveIt from "@/shared/assets/projects/MoveIt.webp";
import imgPlanner from "@/shared/assets/projects/Planner.webp";
import imgBenchmark from "@/shared/assets/projects/Benchmark.webp";
import imgSnakeGame from "@/shared/assets/projects/SnakeGame.webp";

import logoReact from "@/shared/assets/tech-logos/react.webp";
import logoTypeScript from "@/shared/assets/tech-logos/typescript.webp";
import logoNode from "@/shared/assets/tech-logos/Node.js.webp";
import logoExpress from "@/shared/assets/tech-logos/Express.webp";
import logoSQLite from "@/shared/assets/tech-logos/SQLite.webp";
import logoExpo from "@/shared/assets/tech-logos/Expo.webp";
import logoReactNative from "@/shared/assets/tech-logos/react-native.webp";
import logoJest from "@/shared/assets/tech-logos/Jest.webp";
import logoVite from "@/shared/assets/tech-logos/vite.webp";
import logoFirebase from "@/shared/assets/tech-logos/Firebase.webp";
import logoPrisma from "@/shared/assets/tech-logos/Prisma.webp";
import logoGo from "@/shared/assets/tech-logos/go.svg";
import logoLua from "@/shared/assets/tech-logos/lua.svg";
import logoElectron from "@/shared/assets/tech-logos/Electron.webp";
import logoJavaScript from "@/shared/assets/tech-logos/javascript.webp";
import logoWebpack from "@/shared/assets/tech-logos/Webpack.webp";
import logoMaterialUI from "@/shared/assets/tech-logos/Material UI.webp";
import logoHTML5 from "@/shared/assets/tech-logos/html5.webp";
import logoCSS from "@/shared/assets/tech-logos/css.webp";
import logoSass from "@/shared/assets/tech-logos/Sass.webp";
import logoNextjs from "@/shared/assets/tech-logos/nextjs.webp";
import logoFastify from "@/shared/assets/tech-logos/Fastify.webp";
import logoCSharp from "@/shared/assets/tech-logos/CSharp.webp";

export const projects: Project[] = [
  {
    title: "Happy",
    description:
      "Mostra localização de orfanatos próximos abertos para visitação.",
    detailedDescription:
      "Happy mostra localização de orfanatos próximos abertos para visitação. Leve alegria e esperança para crianças em adoção.",
    imageSrc: imgHappy,
    githubLink: "https://github.com/kristyancarvalho/Happy",
    platforms: ["web", "mobile"],
    technologies: [
      { name: "React", logo: logoReact },
      { name: "TypeScript", logo: logoTypeScript },
      { name: "Node.js", logo: logoNode },
      { name: "Express", logo: logoExpress },
      { name: "SQLite", logo: logoSQLite },
      { name: "Expo", logo: logoExpo },
      { name: "React Native", logo: logoReactNative },
      { name: "Jest", logo: logoJest },
    ],
  },
  {
    title: "EcoCash",
    description:
      "Plataforma sustentável que conecta hardware, web e mobile para incentivar a reciclagem.",
    detailedDescription:
      "Plataforma digital sustentável que conecta hardware e web para incentivar a reciclagem. Utilizando Arduino, ESP8266 e React, o Ecocash coleta dados de materiais recicláveis e os exibe em tempo real.",
    imageSrc: imgEcoCash,
    githubLink: "https://github.com/kristyancarvalho/EcoCash",
    platforms: ["web", "mobile"],
    technologies: [
      { name: "TypeScript", logo: logoTypeScript },
      { name: "React", logo: logoReact },
      { name: "Vite", logo: logoVite },
      { name: "Firebase", logo: logoFirebase },
    ],
  },
  {
    title: "Nearby",
    description:
      "Aplicativo mobile de clube de benefícios com cupons em estabelecimentos próximos.",
    detailedDescription:
      "Aplicativo mobile inovador que conecta você a um clube de benefícios exclusivo com cupons e descontos em estabelecimentos próximos.",
    imageSrc: imgNearby,
    githubLink: "https://github.com/kristyancarvalho/Nearby",
    platforms: ["mobile"],
    technologies: [
      { name: "TypeScript", logo: logoTypeScript },
      { name: "React Native", logo: logoReactNative },
      { name: "Expo", logo: logoExpo },
      { name: "Node.js", logo: logoNode },
      { name: "Express", logo: logoExpress },
      { name: "SQLite", logo: logoSQLite },
      { name: "Prisma", logo: logoPrisma },
    ],
  },
  {
    title: "Tux Letter",
    description:
      "Newsletter automatizada com as principais notícias sobre Linux e open source.",
    detailedDescription:
      "Sistema de newsletter automatizada que coleta, filtra e envia diariamente as principais notícias sobre Linux e software open source.",
    imageSrc: imgTuxLetter,
    githubLink: "https://github.com/kristyancarvalho/tux-letter",
    platforms: ["cli"],
    technologies: [
      { name: "TypeScript", logo: logoTypeScript },
      { name: "Node.js", logo: logoNode },
    ],
  },
  {
    title: "OpenPilot.nvim",
    description:
      "Agente de código inteligente para o Neovim, inspirado no GitHub Copilot.",
    detailedDescription:
      "Agente de código inteligente para o editor Neovim. Suporte a múltiplos modelos de IA, controle de rate limit e configuração personalizada.",
    imageSrc: imgOpenPilot,
    githubLink: "https://github.com/kristyancarvalho/openpilot.nvim",
    platforms: ["cli"],
    technologies: [
      { name: "Go", logo: logoGo },
      { name: "Lua", logo: logoLua },
    ],
  },
  {
    title: "GitPulse",
    description:
      "API que gera badges SVG com o último projeto ativo de um usuário no GitHub.",
    detailedDescription:
      "API que gera badges em SVG com o último projeto ativo de um usuário no GitHub, ideal para READMEs e portfólios.",
    imageSrc: imgGitPulse,
    githubLink: "https://github.com/kristyancarvalho/gitpulse",
    platforms: ["web"],
    technologies: [{ name: "Go", logo: logoGo }],
  },
  {
    title: "Codewhisper CLI",
    description:
      "Agente de código via linha de comando para auxiliar desenvolvedores.",
    detailedDescription:
      "Ferramenta de linha de comando que utiliza a API do OpenRouter para fornecer respostas baseadas no contexto de arquivos de código fornecidos.",
    imageSrc: imgCodewhisper,
    githubLink: "https://github.com/kristyancarvalho/codewhisper-cli",
    platforms: ["cli"],
    technologies: [
      { name: "TypeScript", logo: logoTypeScript },
      { name: "Node.js", logo: logoNode },
      { name: "SQLite", logo: logoSQLite },
    ],
  },
  {
    title: "Gerenciador do Blog",
    description: "Programa desktop para gerenciar a aba Posts deste site.",
    detailedDescription:
      "Programa desktop para gerenciar a aba Posts deste site, construído com Electron e Firebase.",
    imageSrc: imgBlogManager,
    githubLink: "https://github.com/kristyancarvalho/blog-manager-app",
    platforms: ["desktop"],
    technologies: [
      { name: "TypeScript", logo: logoTypeScript },
      { name: "React", logo: logoReact },
      { name: "Vite", logo: logoVite },
      { name: "Electron", logo: logoElectron },
      { name: "Firebase", logo: logoFirebase },
    ],
  },
  {
    title: "Paint",
    description:
      "Programa desktop para desenhar em ElectronJS, ReactJS e MaterialUI.",
    detailedDescription:
      "App para desenhar desenvolvido em ElectronJS, ReactJS e MaterialUI.",
    imageSrc: imgPaint,
    githubLink: "https://github.com/kristyancarvalho/paint-desktop-app",
    platforms: ["desktop"],
    technologies: [
      { name: "React", logo: logoReact },
      { name: "JavaScript", logo: logoJavaScript },
      { name: "Electron", logo: logoElectron },
      { name: "Node.js", logo: logoNode },
      { name: "Webpack", logo: logoWebpack },
      { name: "Material UI", logo: logoMaterialUI },
    ],
  },
  {
    title: "Salotti Run",
    description: "Jogo runner endless para culminância de 2023.",
    detailedDescription:
      "Jogo do gênero runner endless desenvolvido com JavaScript, HTML e CSS para projeto de culminância em 2023.",
    imageSrc: imgSalottiRun,
    githubLink: "https://github.com/kristyancarvalho/salotti-run-game",
    platforms: ["web"],
    technologies: [
      { name: "HTML5", logo: logoHTML5 },
      { name: "CSS3", logo: logoCSS },
      { name: "JavaScript", logo: logoJavaScript },
    ],
  },
  {
    title: "LetMeAsk",
    description:
      "Crie salas para responder ou fazer perguntas ao vivo durante uma live.",
    detailedDescription:
      "Crie salas interativas para responder ou fazer perguntas ao vivo durante uma live.",
    imageSrc: imgLetmeask,
    githubLink: "https://github.com/kristyancarvalho/Letmeask",
    platforms: ["web"],
    technologies: [
      { name: "React", logo: logoReact },
      { name: "TypeScript", logo: logoTypeScript },
      { name: "Firebase", logo: logoFirebase },
      { name: "Sass", logo: logoSass },
      { name: "Jest", logo: logoJest },
    ],
  },
  {
    title: "MoveIt",
    description:
      "Temporizador pomodoro gamificado. Desenvolvido em NextJS durante o NLW 4.",
    detailedDescription:
      "Temporizador pomodoro gamificado desenvolvido em NextJS e TypeScript durante o NLW 4 da Rocketseat.",
    imageSrc: imgMoveIt,
    githubLink: "https://github.com/kristyancarvalho/MoveIt",
    platforms: ["web"],
    technologies: [
      { name: "Next.js", logo: logoNextjs },
      { name: "TypeScript", logo: logoTypeScript },
    ],
  },
  {
    title: "Plann.er API",
    description: "API de planejamento de viagem. NLW Journey 2024.",
    detailedDescription:
      "API do Plann.er, aplicação desenvolvida durante o bootcamp NLW Journey da Rocketseat.",
    imageSrc: imgPlanner,
    githubLink: "https://github.com/kristyancarvalho/plann.er-backend",
    platforms: ["web"],
    technologies: [
      { name: "Fastify", logo: logoFastify },
      { name: "TypeScript", logo: logoTypeScript },
      { name: "Prisma", logo: logoPrisma },
    ],
  },
  {
    title: "Paralelismo",
    description:
      "Benchmark entre processamento de imagens em single thread e Worker Threads.",
    detailedDescription:
      "Benchmark comparativo entre single thread e Worker Threads em Node.js para processamento de imagens.",
    imageSrc: imgBenchmark,
    githubLink:
      "https://github.com/kristyancarvalho/multi-thread-image-processing",
    platforms: ["cli"],
    technologies: [
      { name: "Node.js", logo: logoNode },
      { name: "JavaScript", logo: logoJavaScript },
      { name: "Express", logo: logoExpress },
    ],
  },
  {
    title: "C# Snake",
    description:
      "Jogo da cobrinha que roda no terminal, feito para aprender C#.",
    detailedDescription:
      "Jogo da cobrinha que roda no terminal. Projeto didático desenvolvido enquanto aprendia C#.",
    imageSrc: imgSnakeGame,
    githubLink: "https://github.com/kristyancarvalho/terminal-snake-game",
    platforms: ["cli"],
    technologies: [{ name: "C#", logo: logoCSharp }],
  },
];
