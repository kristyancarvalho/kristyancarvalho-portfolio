import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TechCarouselProps {
  theme: 'light' | 'dark';
}

const technologies = [
    { name: 'HTML', logo: '/tech-logos/html5.png' },
    { name: 'CSS', logo: '/tech-logos/css.png' },
    { name: 'JavaScript', logo: '/tech-logos/javascript.png' },
    { name: 'TypeScript', logo: '/tech-logos/typescript.png' },
    { name: 'React', logo: '/tech-logos/react.png' },
    { name: 'Next.js', logo: '/tech-logos/nextjs.png' },
    { name: 'Vite', logo: '/tech-logos/vite.svg' },
    { name: 'Tailwind CSS', logo: '/tech-logos/tailwind-css.svg' },
    { name: 'Styled-Components', logo: '/tech-logos/styledcomponents.png' },
    { name: 'Sass', logo: '/tech-logos/Sass.png' },
    { name: 'Express', logo: '/tech-logos/Express.png' },
    { name: 'Fastify', logo: '/tech-logos/Fastify.png' },
    { name: 'MongoDB', logo: '/tech-logos/MongoDB.png' },
    { name: 'Firebase', logo: '/tech-logos/Firebase.png' },
    { name: 'SQLite', logo: '/tech-logos/SQLite.png' },
    { name: 'Git', logo: '/tech-logos/Git.png' },
    { name: 'GitHub', logo: '/tech-logos/GitHub.png' },
    { name: 'GitHub Actions', logo: '/tech-logos/GitHubActions.png' },
    { name: 'Prisma', logo: '/tech-logos/Prisma.png' },
    { name: 'Jest', logo: '/tech-logos/Jest.png' },
    { name: 'Docker', logo: '/tech-logos/Docker.png' },
    { name: 'Kubernetes', logo: '/tech-logos/Kubernetes.png' }
];

export function TechCarousel({ theme }: TechCarouselProps) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="w-full overflow-hidden transtion-colors lg:py-5 sm:py-0">
      <Slider {...settings}>
        {technologies.map((tech, index) => (
          <div key={index} className="px-4">
            <div className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-lg p-4 flex items-center justify-center h-24 hover:scale-110 transition-all`}>
                <img
                    src={tech.logo} 
                    alt={tech.name} 
                    title={tech.name}
                    className="max-h-16 max-w-16 object-contain"
                />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}