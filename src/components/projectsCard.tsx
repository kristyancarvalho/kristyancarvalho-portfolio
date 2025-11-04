import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Github } from 'lucide-react';
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
    platforms: React.ElementType[];
    detailedDescription: string;
    technologies: Array<{ name: string; logo: string }>;
}

export function ProjectCard({ 
    theme, 
    title, 
    description, 
    imageSrc, 
    githubLink, 
    platforms, 
    detailedDescription, 
    technologies 
}: ProjectCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`w-full cursor-pointer ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'} rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
                    <div className="h-52">
                        <LazyLoadImage
                            src={imageSrc}
                            effect="blur"
                            alt={`${title}-cover`}
                            wrapperClassName="w-full h-52 !block"
                            className="w-full h-52 object-cover rounded-t-md"
                        />
                    </div>

                    <div className="p-4 flex flex-col gap-4">
                        <span>
                            <code className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-1 line-clamp-2`}><strong>{title}</strong></code>
                        </span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 line-clamp-2`}>
                            {description}
                        </span>
                        <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
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
                                    className="lg:w-12 lg:h-12 min-[320px]:h:8 min-[320px]:w-8 object-cover"
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
}