import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder = "Pesquisar...", theme }) => {
  return (
    <div
      className={`mb-6 flex flex-grow p-2 rounded-xl gap-2 ${
        theme === 'dark' 
          ? 'bg-neutral-900 text-white' 
          : 'bg-white text-black border border-gray-300'
      }`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`flex flex-grow p-2 ${
          theme === 'dark' 
            ? 'bg-neutral-900 text-white' 
            : 'bg-white text-black border-none'
        }`}
      />
      <button 
        className="bg-violet-500 text-white px-6 py-4 rounded-lg hover:bg-violet-600 transition duration-300"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;