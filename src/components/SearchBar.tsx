import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder = "Pesquisar...", theme }) => {
  return (
    <div className="mb-6 flex">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`flex-grow p-4 rounded-l ${
          theme === 'dark' 
            ? 'bg-neutral-900 text-white' 
            : 'bg-white text-black border border-gray-300'
        }`}
      />
      <button 
        className="bg-violet-500 text-white px-6 rounded-r hover:bg-violet-600 transition duration-300"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;