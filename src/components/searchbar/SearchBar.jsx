'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 🔹 Debounce utility
const useDebounce = (callback, delay) => {
  const timer = useRef(null);
  const debounced = useCallback(
    (...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
  return debounced;
};

const SearchBar = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const historyRef = useRef([]);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [listening, setListening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🔹 Load recent search history
  useEffect(() => {
    setSearchHistory(historyRef.current.slice(0, 5));
  }, []);

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔹 Fetch search results from backend
  const fetchResults = useCallback(async (searchText) => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://api.stylishhim.com/api/search?query=${encodeURIComponent(searchText)}`);
      const data = await res.json();

      if (data?.success && Array.isArray(data.results)) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Search API error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Debounced search
  const debouncedSearch = useDebounce(fetchResults, 400);

  // 🔹 Handle typing
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setHighlightIndex(-1);
    debouncedSearch(value);
  };

  // 🔹 Handle selection logic (category / product)
  const handleSelect = (item) => {
    if (!item) return;

    const trimmedQuery = query.trim();
    const normalizedQuery = trimmedQuery.toLowerCase();

    const matchesName =
      normalizedQuery.length > 0 && item?.name && item.name.trim().toLowerCase() === normalizedQuery;
    const matchesCategory =
      normalizedQuery.length > 0 && item?.category && item.category.trim().toLowerCase() === normalizedQuery;

    // Save to history
    const updated = [item.name, ...historyRef.current.filter((h) => h !== item.name)].slice(0, 5);
    historyRef.current = updated;
    setSearchHistory(updated);
    setShowSuggestions(false);

    // Navigation logic
    if (matchesName) {
      router.push(`/products/${item._id}`);
      return;
    }

    if (matchesCategory && trimmedQuery) {
      router.push(`/categoryproducts?categoryName=${item.category}`);
      return;
    }

    // Default fallback → navigate to category page
    router.push(`/categoryproducts?categoryName=${item.category}`);
  };

  // 🔹 Clear search
  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setShowSuggestions(false);
    setHighlightIndex(-1);
    inputRef.current?.blur();
  };

  // 🔹 Toggle mic
  const toggleMic = () => {
    setListening(!listening);
    if (!listening) {
      alert('Voice search feature (to be implemented)');
    }
  };

  // 🔹 Redirect to full search page on mobile
  const handleSearchClick = () => {
    if (isMobile) {
      router.push('/fullsearchbar');
    }
  };

  // 🔹 Keyboard navigation (desktop)
  useEffect(() => {
    const onKey = (e) => {
      if (!showSuggestions) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightIndex((idx) => Math.min(idx + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightIndex((idx) => Math.max(idx - 1, 0));
      } else if (e.key === 'Enter') {
        if (highlightIndex >= 0 && results[highlightIndex]) {
          handleSelect(results[highlightIndex]);
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [results, highlightIndex, showSuggestions]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* 🔹 Search Input Box */}
      <div
        onClick={handleSearchClick}
        className={`flex items-center rounded-full px-4 py-2 bg-white border border-gray-300 transition ${
          showSuggestions ? 'shadow-lg' : 'shadow-sm'
        } ${isMobile ? 'cursor-pointer' : ''}`}
      >
        <Search className="text-gray-500 mr-2" />
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onFocus={() => !isMobile && setShowSuggestions(true)}
          readOnly={isMobile}
          placeholder={listening ? 'Listening...' : 'Search for products, brands, categories...'}
          className="flex-1 outline-none text-black placeholder-gray-400 bg-transparent"
        />
        {query && !isMobile && (
          <button onClick={clearQuery} className="text-gray-400 hover:text-gray-600 transition mr-2">
            <X size={18} />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMic();
          }}
          className={`ml-1 transition ${listening ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {listening ? <MicOff /> : <Mic />}
        </button>
      </div>

      {/* 🔹 Suggestions Dropdown (Desktop only) */}
      {!isMobile && showSuggestions && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white rounded-2xl z-20 overflow-hidden border border-gray-200"
          style={{ boxShadow: '0 10px 30px rgba(10,10,10,0.08)' }}
        >
          {loading && <div className="px-4 py-4 text-sm text-gray-500">Searching...</div>}

          {!loading && results.length === 0 && query.trim() !== '' && (
            <div className="px-4 py-4 text-sm text-gray-500">No results found</div>
          )}

          {!loading && results.length > 0 && (
            <div className="max-h-[400px] overflow-y-auto">
              {results.map((item, idx) => {
                const isHighlighted = idx === highlightIndex;
                return (
                  <div
                    key={item._id || idx}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onMouseLeave={() => setHighlightIndex(-1)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${
                      isHighlighted ? 'bg-gray-100' : ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                    <div>
                      <p className="text-sm font-semibold text-black">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
