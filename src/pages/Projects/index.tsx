import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Chrome, Info, Monitor, Smartphone, SquareTerminalIcon, X } from "lucide-react";
import { ProjectCard } from "@/components/projectsCard";
import projectsData from "./projects.json";

interface ProjectsPageProps {
    theme: 'light' | 'dark';
}

const platformIcons: { [key: string]: React.ElementType } = {
    Chrome,
    Smartphone,
    SquareTerminalIcon,
    Monitor,
};

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

    const projects = useMemo(() => {
        return projectsData.map(project => ({
            ...project,
            platforms: project.platforms.map(platform => platformIcons[platform] || null).filter(Boolean),
        }));
    }, []);
    

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