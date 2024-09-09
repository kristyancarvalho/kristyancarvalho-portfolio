import { Link } from 'react-router-dom';
import { Logo } from './logo';
import { SocialMedia } from './social';

interface FooterProps {
    theme: 'light' | 'dark';
}

const usefulLinks = [
    { title: 'Início', link: '/' },
    { title: 'Sobre', link: '/about' },
    { title: 'Projetos', link: '/projects' },
    { title: 'Posts', link: '/posts' },
];

export function Footer({ theme }: FooterProps) {
    return (
        <footer className={`mt-auto py-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-800'}`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <Logo theme={theme} />
                        <p className="mt-4 text-sm text-center md:text-left">
                            Desenvolvedor apaixonado por criar soluções inovadoras e compartilhar conhecimento.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
                        <ul className="space-y-2">
                            {usefulLinks.map((link) => (
                                <li key={link.link}>
                                    <Link 
                                        to={link.link}
                                        className={`text-sm hover:text-violet-500 transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
                                        }`}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-4">Sobre Mim</h3>
                        <p className="text-sm mb-4">
                            Olá! Sou Kristyan Carvalho, um desenvolvedor full-stack apaixonado por tecnologia e inovação. Adoro criar soluções que fazem a diferença na vida das pessoas.
                        </p>
                        <SocialMedia theme={theme} />
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-700 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Kristyan Carvalho. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}