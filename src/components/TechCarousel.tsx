import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TechCarouselProps {
  theme: 'light' | 'dark';
}

const technologies = [
    { name: 'HTML', logo: '/tech-logos/html5.webp' },
    { name: 'CSS', logo: '/tech-logos/css.webp' },
    { name: 'JavaScript', logo: '/tech-logos/javascript.webp' },
    { name: 'TypeScript', logo: '/tech-logos/typescript.webp' },
    { name: 'C#', logo: '/tech-logos/CSharp.webp' },
    { name: 'NodeJS', logo: '/tech-logos/Node.js.webp' },
    { name: 'Expo', logo: '/tech-logos/Expo.webp' },
    { name: 'React', logo: '/tech-logos/react.webp' },
    { name: 'React Native', logo: '/tech-logos/react-native.webp' },
    { name: 'Next.js', logo: '/tech-logos/nextjs.webp' },
    { name: 'Vite', logo: '/tech-logos/vite.webp' },
    { name: 'Tailwind CSS', logo: '/tech-logos/tailwind-css.webp' },
    { name: 'Styled-Components', logo: '/tech-logos/styledcomponents.webp' },
    { name: 'Sass', logo: '/tech-logos/Sass.webp' },
    { name: 'Express', logo: '/tech-logos/Express.webp' },
    { name: 'WebPack', logo: '/tech-logos/Webpack.webp' },
    { name: 'Fastify', logo: '/tech-logos/Fastify.webp' },
    { name: 'MongoDB', logo: '/tech-logos/MongoDB.webp' },
    { name: 'Firebase', logo: '/tech-logos/Firebase.webp' },
    { name: 'SQLite', logo: '/tech-logos/SQLite.webp' },
    { name: 'Git', logo: '/tech-logos/Git.webp' },
    { name: 'GitHub', logo: '/tech-logos/GitHub.webp' },
    { name: 'GitHub Actions', logo: '/tech-logos/GitHubActions.webp' },
    { name: 'Prisma', logo: '/tech-logos/Prisma.webp' },
    { name: 'Jest', logo: '/tech-logos/Jest.webp' },
    { name: 'Docker', logo: '/tech-logos/Docker.webp' },
    { name: 'Kubernetes', logo: '/tech-logos/Kubernetes.webp' }
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