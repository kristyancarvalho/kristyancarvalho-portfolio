import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

interface NotFoundProps {
    theme: 'light' | 'dark';
}

export function NotFound({ theme }: NotFoundProps) {
    return (
        <div className={`transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-200/50'}`}>
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
            <main>
                <div className="container h-screen w-screen flex flex-col items-center justify-center gap-4">
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
                            className="z-10 h-24 w-24"
                        />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-neutral-500">404</h1>
                    <span className="text-xl text-neutral-500">
                        Foguete fora de órbita...
                    </span>
                    <Link to="/" className="text-lgg text-violet-500 hover:underline">Retornar para o início</Link>
                </div>
                <Footer theme={theme}/>
            </main>
        </div>
    );
}