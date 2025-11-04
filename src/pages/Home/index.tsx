import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Download } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface HomePageProps {
    theme: 'light' | 'dark';
}

export function HomePage({ theme }: HomePageProps) {
    return (
        <div className={`overflow-x-hidden transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-200/50'}`}>
            <main className="h-screen w-screen flex lg:items-center container px-6 sm:px-8 pt-24 lg:pt-12 items-center">
                <div className="lg:-mt-12 w-full lg:w-auto">
                    <div id="presentation" 
                        className="mb-8 sm:mb-12 lg:mb-16 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}       
                            transition={{ delay: 0.2 }}
                        >
                            <code className={`uppercase ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-white bg-violet-500/50'} px-3 py-1 rounded-sm text-xs sm:text-base md:text-xl lg:text-2xl xl:text-3xl`}>Prazer, sou Kristyan!</code>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1, y: -10  }}
                            transition={{ delay: 0.5, type: "just", duration: 0.8 }}
                            className="mt-4 sm:mt-6 lg:mt-8"
                        >
                            <span className="bg-gradient-to-r from-violet-800 to-violet-400 inline-block text-transparent bg-clip-text font-bold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight"><strong>desenvolvedor</strong> <br />full-stack.</span>
                        </motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}       
                        transition={{ delay: 0.7 }}
                        className={`w-full sm:w-3/4 lg:w-2/4 my-8 sm:my-12 lg:my-20 ${theme === 'dark' ? 'text-neutral-500 lg:text-neutral-400/80' : 'text-neutral-600 lg:text-neutral-600'} text-sm sm:text-base lg:text-xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0`}>
                        Olá! Sou Kristyan Carvalho, um desenvolvedor fullstack apaixonado por criar soluções web inovadoras e eficientes. Com experiência em tecnologias de ponta como TypeScript, Prisma, Fastify, Express, Vite e Next.
                    </motion.p>
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}       
                        transition={{ delay: 0.8 }}
                        className="flex w-full justify-center lg:justify-start"
                    >    
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: -25 }}       
                            transition={{ delay: 0.8, type: "tween", duration: 1, repeat: Infinity, repeatType: "mirror" }}
                            className="pb-8"
                            id="rocketImage"                
                        >
                            <LazyLoadImage
                                src="/rocket_mobile.webp"
                                effect="blur"
                                alt="rocketMobile"
                                className="z-10 h-24 w-24 hidden min-[320px]:block lg:hidden"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}       
                        transition={{ delay: 0.8 }}
                        id="actionButtons"
                        className="flex flex-col lg:flex-row gap-4 items-center lg:items-start"
                    >
                        <a href="KristyanCarvalho.pdf" download="KristyanCarvalho-cv"
                            className="font-semibold bg-violet-500 text-white px-6 flex items-center gap-2 py-2 rounded-md hover:bg-violet-600"
                        >
                            <Download />
                            Baixar currículo
                        </a>
                        <Link to="/projetos"
                        className={`${theme === 'dark' ? 'text-white' : 'text-neutral-600'} px-4 py-2 underline`}>
                            Ver projetos
                        </Link>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}       
                    transition={{ delay: 0.8 }}
                >    
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: -25 }}       
                        transition={{ delay: 0.8, type: "tween", duration: 1, repeat: Infinity, repeatType: "mirror" }}
                        className="mt-20"
                        id="rocketImage"                
                    >
                        <LazyLoadImage
                            src="/rocket.webp"
                            effect="blur"
                            alt="rocket"
                            className="z-10 hidden lg:block"
                        />
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}