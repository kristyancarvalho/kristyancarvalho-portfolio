import { Link, useLocation } from 'react-router-dom';
import { Logo } from './logo';
import { SocialMedia } from './social';

interface FooterProps {
    theme: 'light' | 'dark';
}

const usefulLinks = [
    { title: 'Início', link: '/' },
    { title: 'Sobre', link: '/sobre' },
    { title: 'Projetos', link: '/projetos' },
    { title: 'Posts', link: '/posts' },
];

export function Footer({ theme }: FooterProps) {
    const location = useLocation();

    const handleLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={`mt-auto py-12 lg:py-16 ${theme === 'dark' ? 'bg-zinc-950 text-white border-t border-zinc-800' : 'bg-zinc-200/50 text-zinc-800 border-t border-zinc-300'}`}>
            <div className="container mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    <div className="flex flex-col items-center md:items-start">
                        <Logo theme={theme} />
                        <p className={`mt-4 text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-400/70' : 'text-neutral-600/70'}`}>
                            Desenvolvedor apaixonado por criar soluções inovadoras e compartilhar conhecimento.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
                        <ul className="space-y-3">
                            {usefulLinks.map((link) => {
                                const isActive = location.pathname === link.link;
                                return (
                                    <li key={link.link}>
                                        <Link 
                                            to={link.link}
                                            onClick={handleLinkClick}
                                            className={`text-sm transition-colors duration-300 ${
                                                isActive 
                                                    ? 'text-violet-500 font-semibold' 
                                                    : theme === 'dark' 
                                                        ? 'text-neutral-400 hover:text-violet-500' 
                                                        : 'text-neutral-600 hover:text-violet-500'
                                            }`}
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-4">Contato</h3>
                        <SocialMedia theme={theme} />
                    </div>
                </div>
                <div className={`mt-12 pt-8 border-t text-center text-sm ${theme === 'dark' ? 'border-zinc-800 text-neutral-500' : 'border-zinc-300 text-neutral-600'}`}>
                    <p>&copy; {new Date().getFullYear()} Kristyan Carvalho. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}