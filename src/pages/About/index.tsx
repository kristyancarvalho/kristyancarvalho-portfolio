import { motion, useScroll, useTransform } from "framer-motion";
import { TechCarousel } from "@/components/TechCarousel";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumb";

interface AboutPageProps {
    theme: 'light' | 'dark';
}

const imageCache = new Map();
const LAPTOP_IMAGE_URL = "/laptop.webp";

const preloadImage = (src: string): Promise<void> => {
    if (imageCache.has(src)) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            imageCache.set(src, img);
            resolve();
        };
        img.onerror = reject;
        img.src = src;
    });
};

export function AboutPage({ theme }: AboutPageProps) {
    const location = useLocation();
    const aboutRef = useRef(null);
    const techRef = useRef(null);
    const carouselRef = useRef(null);
    const containerRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        preloadImage(LAPTOP_IMAGE_URL)
            .then(() => setImageLoaded(true))
            .catch(error => console.error('Error preloading image:', error));
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

    useEffect(() => {
        if (location.hash === '#technologies') {
            const element = document.getElementById('technologies');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    useEffect(() => {
        if (location.hash === '#about') {
            const element = document.getElementById('about');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const breadcrumbItems = [
        { label: 'Sobre mim', href: '#about' },
        { label: 'Tecnologias', href: '#technologies' },
    ];

    return (
        <div className={`overflow-x-hidden transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-200/50'}`}>
            <motion.main 
                ref={containerRef}
                style={{ opacity, scale }}
                className="container flex w-screen lg:py-28 min-[320px]:py-24 flex-col gap-8 lg:px-36"
            >
                <motion.div 
                    className="lg:-mb-12 lg:mt-8 min-[320px]:-mb-8"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <Breadcrumbs items={breadcrumbItems} theme={theme} />
                </motion.div>

                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{                             
                            type: "spring", 
                            stiffness: 200, 
                            damping: 30,
                            delay: 0.1
                        }}
                        style={{ y }}
                        className="flex justify-center items-center w-full bg-violet-500/50 rounded-lg mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 50 }}
                            transition={{                             
                                type: "spring", 
                                stiffness: 200,
                                delay: 0.3,
                                duration: 0.3,
                            }}
                        >
                            <LazyLoadImage
                                src={LAPTOP_IMAGE_URL}
                                effect="blur"
                                alt="laptop"
                                className="max-h-screen-sm max-w-screen-sm lg:max-h-64 min-[320px]:max-h-56"
                                beforeLoad={() => {
                                    // Use cached image if available
                                    if (imageCache.has(LAPTOP_IMAGE_URL)) {
                                        setImageLoaded(true);
                                    }
                                }}
                                afterLoad={() => {
                                    setImageLoaded(true);
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        ref={aboutRef}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, type: "spring" }}
                        className="flex-col items-end"
                    >
                        <div id="about" className="">
                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, type: "just", duration: 0.5 }}
                                className="flex"
                            >
                                <code className={`text-3xl px-2 py-1 mb-4 ${theme === 'dark' ? 'text-neutral-500/80 bg-neutral-800/50' : 'text-neutral-500 bg-neutral-800/20'} rounded-sm`}>
                                    /sobre mim
                                </code>
                            </motion.span>
                            <div className="flex flex-col gap-6 text-lg text-neutral-500/80">
                                <motion.p 
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 0.5, type: "just", duration: 0.5 }}
                                    className="px-3"
                                >
                                   Olá! Sou Kristyan, um dedicado Desenvolvedor Fullstack com uma paixão por criar aplicações web elegantes e eficientes. Minha jornada na tecnologia começou em São Paulo, onde a curiosidade e a criatividade despertaram meu interesse pelo desenvolvimento de software. Ao longo dos anos, aperfeiçoei minhas habilidades em tecnologias de front-end e back-end, sempre me esforçando para criar experiências de usuário perfeitas e funcionalidades robustas.
                                </motion.p>

                                <motion.code
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 0.8, type: "just", duration: 0.5 }}
                                >
                                    <code className={`text-2xl px-2 py-1 ${theme === 'dark' ? 'text-neutral-500/80 bg-neutral-800/50' : 'text-neutral-500 bg-neutral-800/20'} rounded-sm`}>
                                        Minha jornada
                                    </code>
                                </motion.code>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 1, type: "just", duration: 0.5 }}
                                    className="px-3"
                                >
                                    Cresci em São Paulo, onde sempre fui fascinado por como as coisas funcionam. Essa curiosidade me levou a mergulhar na programação e tecnologia. Através de autoestudo, cursos online e projetos do mundo real, desenvolvi uma base sólida em engenharia de software.
                                </motion.p>
                                <motion.span
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 1.2, type: "just", duration: 0.5 }}
                                >
                                    <code className={`text-2xl px-2 py-1 ${theme === 'dark' ? 'text-neutral-500/80 bg-neutral-800/50' : 'text-neutral-500 bg-neutral-800/20'} rounded-sm`}>
                                        Interesses Pessoais
                                    </code>
                                </motion.span>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 1.4, type: "just", duration: 0.5 }}
                                    className="px-3"
                                >
                                    Além de programar, adoro assistir filmes e documentários, o que me ajuda a manter uma mentalidade equilibrada e criativa, essas atividades refrescam minha perspectiva e inspiram soluções inovadoras no meu trabalho.
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    ref={techRef}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, type: "spring" }}
                    id="technologies" 
                    className="py-12 flex flex-col"
                >
                    <div>
                        <motion.span 
                                initial={{ opacity: 0, y: 0}}
                                animate={{ opacity: 1, y: 15}}
                                transition={{ delay: 1.6, type: "just", duration: 0.5 }}
                            >
                                <code className={`text-3xl px-2 ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-neutral-600 bg-neutral-300/50'} rounded-sm overflow-hidden`}>
                                    /tecnologias
                                </code>
                            </motion.span>
                            <div className="flex lg:flex-row gap-8 mt-4 min-[320px]:flex-col">
                            <motion.div
                                initial={{ opacity: 0, y: 0}}
                                animate={{ opacity: 1, y: 15}}
                                transition={{ delay: 1.8, type: "just", duration: 0.5 }}
                            >
                                <code className={`text-2xl px-2 py-1 ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-neutral-600 bg-neutral-300/50'} rounded-sm`}>
                                    Front-End
                                </code>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 2, type: "just", duration: 0.5 }}
                                    className="text-neutral-500/80"
                                >
                                    <strong>Linguagens:</strong> HTML, CSS, JavaScript, TypeScript, Lua
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 2.2, type: "just", duration: 0.5 }}
                                    className="text-neutral-500/80"
                                >
                                    <strong>Frameworks/Bibliotecas:</strong> ReactJS, NextJS, Vite
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 2.4, type: "just", duration: 0.5 }}
                                    className="text-neutral-500/80"
                                >
                                    <strong>Estilização:</strong> Tailwind CSS, Styled-Components, Sass
                                </motion.p>
                            </motion.div>

                            <motion.div
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 2.6, type: "just", duration: 0.5 }}
                            >
                                <code className={`text-2xl px-2 py-1 ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-neutral-600 bg-neutral-300/50'} rounded-sm`}>
                                    Back-End
                                </code>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 2.8, type: "just", duration: 0.5 }}
                                    className="text-neutral-500/80"
                                >
                                    <strong>Linguagens:</strong> Typescript, Javascript, Golang
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 3, type: "just", duration: 0.5 }}
                                    className="text-neutral-500/80"
                                >
                                    <strong>Frameworks:</strong> Express, Fastify
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 0}}
                                    animate={{ opacity: 1, y: 15}}
                                    transition={{ delay: 3.2, type: "just", duration: 0.5 }}
                                    className="text-neutral-500/80"
                                >
                                    <strong>Bancos de Dados:</strong> MongoDB, Firebase, SQlite
                                </motion.p>
                            </motion.div>
                                <motion.div
                                        initial={{ opacity: 0, y: 0}}
                                        animate={{ opacity: 1, y: 15}}
                                        transition={{ delay: 3.4, type: "just", duration: 0.5 }}
                                >
                                    <code className={`text-2xl px-2 py-1 ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-neutral-600 bg-neutral-300/50'} rounded-sm`}>
                                        Ferramentas
                                    </code>
                                    <motion.p
                                        initial={{ opacity: 0, y: 0}}
                                        animate={{ opacity: 1, y: 15}}
                                        transition={{ delay: 3.6, type: "just", duration: 0.5 }}
                                        className="text-neutral-500/80"
                                    >
                                        <strong>Controle de Versão:</strong> Git, GitHub
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 0}}
                                        animate={{ opacity: 1, y: 15}}
                                        transition={{ delay: 3.8, type: "just", duration: 0.5 }}
                                        className="text-neutral-500/80"
                                    >
                                        <strong>CI/CD:</strong> GitHub Actions
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 0}}
                                        animate={{ opacity: 1, y: 15}}
                                        transition={{ delay: 4.0, type: "just", duration: 0.5 }}
                                        className="text-neutral-500/80"
                                    >
                                        <strong>ORM:</strong> Prisma
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 0}}
                                        animate={{ opacity: 1, y: 15}}
                                        transition={{ delay: 4.2, type: "just", duration: 0.5 }}
                                        className="text-neutral-500/80"
                                    >
                                        <strong>Testes:</strong> Jest
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 0}}
                                        animate={{ opacity: 1, y: 15}}
                                        transition={{ delay: 4.4, type: "just", duration: 0.5 }}
                                        className="text-neutral-500/80"
                                    >
                                        <strong>Containerização:</strong> Docker, Kubernetes
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>        
                </motion.div>

                <motion.div
                    ref={carouselRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, type: "spring" }}
                >
                    <TechCarousel theme={theme} />
                </motion.div>
            </motion.main>
        </div>
    )
}