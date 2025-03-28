import React, { useEffect, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import clsx from 'clsx';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Tìm kiếm...',
  onSearch,
  className = '',
  initialValue = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('query') || '';
    setSearchQuery(decodeURIComponent(query));
  }, []);

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'relative flex w-full items-center rounded-full border border-gray-300 bg-white transition-all focus-within:border-[#291D4C] focus-within:shadow-md',
        className
      )}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full py-2 pl-4 pr-10 outline-none"
      />
      {searchQuery ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 text-gray-400 hover:text-gray-600"
          aria-label="Xóa tìm kiếm"
        >
          <FaTimes />
        </button>
      ) : null}
      <button
        type="submit"
        className="absolute right-3 grid h-8 w-8 place-items-center rounded-full bg-[#291D4C] text-white transition-colors hover:bg-[#3a2a6b]"
        aria-label="Tìm kiếm"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
