import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
  theme: 'light' | 'dark';
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, theme }) => {
  return (
    <nav className="flex mb-4 md:mb-8 overflow-x-hidden" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 whitespace-nowrap">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center min-[320px]:gap-1 md:gap-2 lg:gap-3">
            {index > 0 && (
              <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mx-1 md:mx-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            )}
            <Link
              to={item.href}
              className={`inline-flex items-center text-xs md:text-sm font-medium 
                ${theme === 'dark' 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-800'
                } 
                ${index === items.length - 1 
                  ? theme === 'dark' ? 'text-gray-100' : 'text-gray-800' 
                  : ''
                }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;