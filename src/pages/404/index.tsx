import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

interface NotFoundProps {
    theme: 'light' | 'dark';
}

export function NotFound({ theme }: NotFoundProps) {
    return (
        <div className={`transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-200/50'}`}>
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
                            src="/rocket.webp"
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
            </main>
        </div>
    );
}