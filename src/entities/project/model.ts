export interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  imageSrc: string;
  githubLink: string;
  platforms: Array<"web" | "mobile" | "desktop" | "cli">;
  technologies: Array<{ name: string; logo: string }>;
}
