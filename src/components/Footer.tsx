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
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="flex flex-col items-center">
                        <Logo theme={theme} />
                        <p className="mt-4 text-sm">
                            Desenvolvedor apaixonado por criar soluções inovadoras e compartilhar conhecimento.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
                        <ul className="space-y-2 text-start">
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
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-4">Contato:</h3>
                        <SocialMedia theme={theme} />
                    </div>
                </div>
                <div className={`mt-8 pt-4 border-t text-center text-sm w-full ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-300'}`}>
                    <p>&copy; {new Date().getFullYear()} Kristyan Carvalho. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}