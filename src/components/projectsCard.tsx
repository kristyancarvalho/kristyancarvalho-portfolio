import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LucideIcon, Github } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface ProjectCardProps {
    theme: 'light' | 'dark';
    title: string;
    description: string;
    imageSrc: string;
    githubLink: string;
    platforms: LucideIcon[];
    detailedDescription: string;
    technologies: Array<{ name: string; logo: string }>;
}

export const ProjectCard = ({ 
    theme, 
    title, 
    description, 
    imageSrc, 
    githubLink, 
    platforms, 
    detailedDescription, 
    technologies 
}: ProjectCardProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`w-full h-full rounded-md ${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-white'} flex flex-col cursor-pointer`}>
                    <LazyLoadImage
                        src={imageSrc}
                        effect="blur"
                        alt={`${title}-cover`}
                        className="w-full lg:h-60 min-[320px]:h-40 object-cover rounded-t-md"
                    />
                    <div className="p-4 flex flex-col gap-4 flex-grow">
                        <span>
                            <code className={`text-2xl ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'}`}><strong>{title}</strong></code>
                        </span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-neutral-500/80' : 'text-neutral-500'}`}>
                            {description}
                        </span>
                        <div className={`flex items-center gap-2 mt-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {platforms.map((Icon, index) => <Icon key={index} size={18} />)}
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className={`overscroll-y-auto lg:max-w-[640px] max-w-[95%] rounded-lg pt-8 border-none ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
                <DialogHeader className="flex flex-col gap-4">
                    <DialogTitle className="text-2xl"><code>{title}</code></DialogTitle>
                    <LazyLoadImage
                        src={imageSrc}
                        effect="blur"
                        alt={`${title}-cover`}
                        className="w-full lg:h-60 min-[320px]:h-40 object-cover rounded-md"
                    />
                    <DialogDescription className={`${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>
                        {detailedDescription}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <h4 className="text-sm font-medium my-4" >Tecnologias usadas:</h4>
                    <div className="grid grid-cols-4 lg:grid-cols-5 gap-2 items-center">
                        {technologies.map((tech, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <LazyLoadImage
                                    effect="blur" 
                                    src={tech.logo} 
                                    alt={tech.name} 
                                    className="w-12 h-12 object-cover"
                                    title={tech.name}
                                />
                                <span className="text-xs mt-1 text-center">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <Link to={githubLink} target="_blank" className={`px-5 py-4 rounded-md text-bold ${theme === 'dark' ? 'bg-white text-neutral-800' : 'bg-black text-white'} hover:underline flex items-center justify-center gap-3 text-sm`}>
                        <Github size={18} />
                        Ver no Github
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};