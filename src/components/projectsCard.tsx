import React from 'react';
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LucideIcon, Github } from 'lucide-react';

interface ProjectCardProps {
    theme: 'light' | 'dark';
    title: string;
    description: string;
    imageSrc: string;
    githubLink: string;
    platforms: LucideIcon[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ theme, title, description, imageSrc, githubLink, platforms }) => {
    return (
        <div className={`w-full h-full rounded-md ${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-white'} flex flex-col`}>
            <LazyLoadImage
                src={imageSrc}
                effect="blur"
                alt={`${title}-cover`}
                className="w-full lg:h-60 min-[320px]:h-40 object-cover rounded-t-md"
            />
            <div id="text" className="p-4 flex flex-col gap-4 flex-grow">
                <span id="title">
                    <code className={`text-2xl ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'}`}><strong>{title}</strong></code>
                </span>
                <span id="description" className={`text-sm ${theme === 'dark' ? 'text-neutral-500/80' : 'text-neutral-500'}`}>
                    {description}
                </span>
                <div id="platforms" className={`flex items-center gap-2 mt-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {platforms.map((Icon, index) => <Icon key={index} size={18} />)}
                </div>
            </div>
            <div id="action-button" className={`w-full flex items-center justify-center border-dashed border-t-2 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-800/30'}`}>
                <Link to={githubLink} target="_blank" className={`px-5 py-4 ${theme === 'dark' ? 'text-white' : 'text-neutral-800'} hover:underline flex items-center justify-center gap-3 text-sm`}>
                    <Github size={18} />
                    Ver no Github
                </Link>
            </div>
        </div>
    );
};