import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Chrome, Info, Monitor, Smartphone, SquareTerminalIcon, X } from "lucide-react";
import { ProjectCard } from "@/components/projectsCard";

interface ProjectsPageProps {
    theme: 'light' | 'dark';
}

export function ProjectsPage({ theme }: ProjectsPageProps) {
    const [showInfo, setShowInfo] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const projects = [
        {
            title: "Happy",
            description: "Happy mostra localização de orfanatos próximos abertos para visitação.",
            imageSrc: "/Happy.webp",
            githubLink: "https://github.com/kristyancarvalho/Happy",
            detailedDescription: "Happy mostra localização de orfanatos próximos abertos para visitação. Leve alegria e esperança para crianças em adoção.",
            technologies: [
                { name: "React", logo: "/tech-logos/react.webp" },
                { name: "Typescript", logo: "/tech-logos/typescript.webp" },
                { name: "NodeJS", logo: "/tech-logos/Node.js.webp" },
                { name: "Express", logo: "/tech-logos/Express.webp" },
                { name: "SQLite", logo: "/tech-logos/SQLite.webp" },
                { name: "Expo", logo: "/tech-logos/Expo.webp" },
                { name: "React Native", logo: "/tech-logos/react-native.webp" },
                { name: "Jest", logo: "/tech-logos/Jest.webp" },
            ],
            platforms: [Chrome, Smartphone],
        },
        {
            title: "Paint",
            description: "App desktop para desenhar desenvolvido em ElectronJS, ReactJS e MaterialUI.",
            imageSrc: "/Paint.webp",
            githubLink: "https://github.com/kristyancarvalho/paint-desktop-app",
            detailedDescription: "App para desenhar desenvolvido em ElectronJS, ReactJS e MaterialUI.",
            technologies: [
                { name: "React", logo: "/tech-logos/react.webp" },
                { name: "Javascript", logo: "/tech-logos/javascript.webp" },
                { name: "Electron", logo: "/tech-logos/Electron.webp" },
                { name: "NodeJS", logo: "/tech-logos/Node.js.webp" },
                { name: "Webpack", logo: "/tech-logos/Webpack.webp" },
                { name: "Material UI", logo: "/tech-logos/Material UI.webp" },
            ],
            platforms: [Monitor],
        },
        {
            title: "Salotti Run",
            description: "Salotti Run é um jogo do gênero runner endless para culminância de 2023.",
            imageSrc: "/SalottiRun.webp",
            githubLink: "https://github.com/kristyancarvalho/salotti-run-game?tab=readme-ov-file",
            detailedDescription: "Salotti Run é um jogo do gênero runner endless. Desenvolvido principalmente com JavaScript, HTML e CSS para o projeto de culminância da escola estadual Professor Alberto Salotti em 2023.",
            technologies: [
                { name: "HTML5", logo: "/tech-logos/html5.webp" },
                { name: "CSS3", logo: "/tech-logos/css.webp" },
                { name: "Javascript", logo: "/tech-logos/javascript.webp" },
            ],
            platforms: [Chrome],
        },
        {
            title: "LetMeAsk",
            description: "Crie salas para responder ou para fazer perguntas ao vivo durante uma live.",
            imageSrc: "/Letmeask.webp",
            githubLink: "https://github.com/kristyancarvalho/Letmeask",
            detailedDescription: "Crie salas interativas para responder ou para fazer perguntas ao vivo durante uma live",
            technologies: [
                { name: "React", logo: "/tech-logos/react.webp" },
                { name: "Typescript", logo: "/tech-logos/typescript.webp" },
                { name: "NodeJS", logo: "/tech-logos/Node.js.webp" },
                { name: "Firebase", logo: "/tech-logos/Firebase.webp" },
                { name: "Sass", logo: "/tech-logos/Sass.webp" },
                { name: "Jest", logo: "/tech-logos/Jest.webp" },
            ],
            platforms: [Chrome],
        },        {
            title: "MoveIt",
            description: "Temporizador pomodoro gamificado. Desenvolvido em NextJS e Typescript durante o NLW 4.",
            imageSrc: "/MoveIt.webp",
            githubLink: "https://github.com/kristyancarvalho/MoveIt",
            detailedDescription: "API do Plann.er, aplicação de planejamento de viagem. NLW Journey 2024.",
            technologies: [
                { name: "NextJS", logo: "/tech-logos/nextjs.webp" },
                { name: "Typescript", logo: "/tech-logos/typescript.webp" },
                { name: "NodeJS", logo: "/tech-logos/Node.js.webp" },
            ],
            platforms: [Chrome],
        },
        {
            title: "Paralelismo",
            description: "Benchmark comparativo entre processamento de imagens em single thread e Worker Threads.",
            imageSrc: "/Benchmark.webp",
            githubLink: "https://github.com/kristyancarvalho/multi-thread-image-processing",
            detailedDescription: "Benchmark comparativo entre processamento de imagens em single thread e utilizando Worker Threads em Node.js. Visa medir e comparar o desempenho de ambas as abordagens ao realizar operações de redimensionamento e conversão para escala de cinza em imagens.",
            technologies: [
                { name: "NodeJS", logo: "/tech-logos/Node.js.webp" },
                { name: "Javascript", logo: "/tech-logos/javascript.webp" },
                { name: "Express", logo: "/tech-logos/Express.webp" },
            ],
            platforms: [SquareTerminalIcon],
        },          {
            title: "C# Snake",
            description: "Jogo da cobrinha que roda no terminal. Projeto didático que fiz enquanto aprendia C#.",
            imageSrc: "/SnakeGame.webp",
            githubLink: "https://github.com/kristyancarvalho/terminal-snake-game",
            detailedDescription: "Jogo da cobrinha que roda no terminal. Projeto didático que fiz enquanto aprendia C#.",
            technologies: [
                { name: "C#", logo: "/tech-logos/CSharp.webp" },
            ],
            platforms: [SquareTerminalIcon],
        },        {
            title: "Plann.er API",
            description: "API do Plann.er, aplicação de planejamento de viagem. NLW Journey 2024.",
            imageSrc: "/Planner.webp",
            githubLink: "https://github.com/kristyancarvalho/plann.er-backend",
            detailedDescription: "API do Plann.er, aplicação desenvolvida durante o bootcamp 'NLW Journey' da Rocketseat.",
            technologies: [
                { name: "Fastify", logo: "/tech-logos/Fastify.webp" },
                { name: "Typescript", logo: "/tech-logos/typescript.webp" },
                { name: "Prisma", logo: "/tech-logos/Prisma.webp" },
            ],
            platforms: [Chrome],
        },
    ];
    

    return (
        <div className={`transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-200/50'} min-h-screen flex flex-col`}>
            <main className={`container mx-auto px-4 pb-8 lg:py-32 min-[320px]:py-24 flex-grow`}>
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "just", duration: 0.5 }}
                    className="flex"
                >
                    <code className={`text-3xl px-2 py-1 mb-8 ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-neutral-600 bg-neutral-300/50'} rounded-sm overflow-hidden`}>
                        /projetos
                    </code>
                </motion.span>
                {showInfo && (
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "just", duration: 0.5 }}
                        id="info"
                        className="relative"
                    >
                        <span className={`w-full py-1 px-2 flex items-center gap-2 text-semibold border-2 rounded-lg bg-violet-500/40 text-xs lg:text-sm ${theme === 'dark' ? 'text-violet-200 border-violet-400/20' : 'text-violet-950 border-violet-400'}`}>
                            <Info size={18} />
                            Clique no card para ver mais sobre o projeto.
                        </span>
                        <button 
                            onClick={() => setShowInfo(false)}
                            className={`absolute top-1 right-1 p-1 rounded-full ${theme === 'dark' ? 'bg-violet-400/20 text-violet-200 hover:bg-violet-400/30' : 'bg-violet-400/40 text-violet-950 hover:bg-violet-400/60'} transition-colors duration-200`}
                        >
                            <X size={14} />
                        </button>
                    </motion.span>
                )}
                <div id="projects" className="py-6 w-full">
                    <motion.div 
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 min-[320px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                            >
                                <ProjectCard
                                    theme={theme}
                                    title={project.title}
                                    description={project.description}
                                    imageSrc={project.imageSrc}
                                    githubLink={project.githubLink}
                                    platforms={project.platforms}
                                    detailedDescription={project.detailedDescription}
                                    technologies={project.technologies}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
