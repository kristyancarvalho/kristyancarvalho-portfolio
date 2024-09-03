import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { Download } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';

interface HomePageProps {
    theme: 'light' | 'dark';
}

export function HomePage({ theme }: HomePageProps) {
    return (
        <div className={`overflow-x-hidden transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-200/50'}`}>
            <Helmet>
                <meta property="og:title" content="Kristyan Carvalho | Desenvolvedor Full-Stack" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://kristyancarvalho.vercel.app" />
                <meta property="og:image" content="https://kristyancarvalho.vercel.app/metadata_image.svg" />
                <meta property="og:description" content="Explore o portfólio de Kristyan Carvalho, Desenvolvedor Full-Stack especializado em tecnologias modernas como TypeScript, React, e Node.js. Descubra seus projetos e habilidades." />
                <meta property="og:locale" content="pt_BR" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Kristyan Carvalho | Desenvolvedor Full-Stack" />
                <meta name="twitter:description" content="Portfólio de Kristyan Carvalho, Desenvolvedor Full-Stack especializado em TypeScript, React, Node.js e mais." />
                <meta name="twitter:image" content="https://kristyancarvalho.vercel.app/metadata_image.svg" />
                <meta name="twitter:image:alt" content="Portfólio de Kristyan Carvalho" />

                <meta name="description" content="Portfólio de Kristyan Carvalho, Desenvolvedor Full-Stack especializado em TypeScript, React, Node.js e mais." />
                <meta name="keywords" content="Kristyan Carvalho, Desenvolvedor, Desenvolvedor Full-Stack, TypeScript, React, Node.js, portfólio" />
                <meta name="author" content="Kristyan Carvalho" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <main className="h-screen w-screen flex lg:items-center container lg:pt-12 px-8 min-[320px]:pt-40 min-[320px]:items-start">
                <div className="-mt-12">
                    <div id="presentation" 
                        className="min-[320px]:mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}       
                            transition={{ delay: 0.2 }}
                        >
                            <code className={`text-3xl uppercase ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-white bg-violet-500/50'} px-4 py-1 rounded-sm md:text-2xl min-[320px]:text-lg`}>Prazer, sou Kristyan!</code>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1, y: -10  }}
                            transition={{ delay: 0.5, type: "just", duration: 0.8 }}
                            className="mt-8"
                        >
                            <span className="text-7xl lg:text-8xl bg-gradient-to-r from-violet-800 to-violet-400 inline-block text-transparent bg-clip-text font-bold uppercase md:text-5xl  min-[320px]:text-4xl">desenvolvedor <br />full-stack.</span>
                        </motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}       
                        transition={{ delay: 0.7 }}
                        className={`text-xl w-2/4 ${theme === 'dark' ? 'min-[320px]:text-neutral-500 lg:text-neutral-400/80' : 'min-[320px]:text-neutral-500 lg:text-neutral-600'} my-20 md:text-lg md:w-full min-[320px]:text-sm min-[320px]:w-full min-[320px]:-mt-10`}>
                        Olá! Sou Kristyan Carvalho, um desenvolvedor fullstack apaixonado por criar soluções web inovadoras e eficientes. Com experiência em tecnologias de ponta como TypeScript, Prisma, Fastify, Express, Vite e Next.
                    </motion.p>
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}       
                        transition={{ delay: 0.8 }}
                        className="flex w-full min-[320px]:flex-col min-[320px]:items-center"
                    >    
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: -25 }}       
                            transition={{ delay: 0.8, type: "tween", duration: 1, repeat: Infinity, repeatType: "mirror" }}
                            className="pb-12"
                            id="rocketImage"                
                        >
                            <LazyLoadImage
                                src="/rocket_mobile.png"
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
                        className="flex lg:flex-row gap-4 min-[320px]:flex-col min-[320px]:items-center"
                    >
                        <a href="KristyanCarvalho.pdf" download="KristyanCarvalho-cv"
                            className="font-semibold bg-violet-500 text-white px-6 flex items-center gap-2 py-2 rounded-md hover:bg-violet-600"
                        >
                            <Download />
                            Baixar currículo
                        </a>
                        <Link to="/projects"
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
                            src="/rocket.png"
                            effect="blur"
                            alt="rocket"
                            className="z-10 hidden lg:block"
                        />
                    </motion.div>
                </motion.div>
            </main>
            <Footer theme={theme} />
        </div>
    )
}