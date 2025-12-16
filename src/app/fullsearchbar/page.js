"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, X, Search, ArrowLeft, Trash2 } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import CategorySlider from "@/components/CategorySlider";
import BeautyProductsGrid from "../homepage/page";
 

// Debounce utility
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

const FullScreenSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const inputRef = useRef(null);

  // Speech Recognition Hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Load recent searches on mount and focus input
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
      setSearchHistory(stored);
      if (stored.length > 0) {
        setShowRecentSearches(true);
      }
    } catch (err) {
      console.error("Failed to load recent searches", err);
    }
    
    // Auto-focus input on mount
    inputRef.current?.focus();
  }, []);

  // Update query when transcript changes
  useEffect(() => {
    if (transcript) {
      setQuery(transcript);
      if (transcript.length > 0) {
        setShowRecentSearches(false);
        debouncedSearch(transcript);
      }
    }
  }, [transcript]);

  // Handle input focus
  const handleFocus = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
      setSearchHistory(stored);
      if (stored.length > 0 && query.trim() === "") {
        setShowRecentSearches(true);
      }
    } catch (err) {
      console.error("Failed to load recent searches", err);
    }
  };

  // Fetch API (debounced)
  const fetchResults = useCallback(async (searchText) => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://api.stylishhim.com/api/search?query=${encodeURIComponent(searchText)}`);
      const data = await res.json();

      if (data?.success && data?.results?.length > 0) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search API error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useDebounce(fetchResults, 500);

  // Handle typing
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      setShowRecentSearches(false);
      debouncedSearch(value);
    } else {
      setResults([]);
      if (searchHistory.length > 0) {
        setShowRecentSearches(true);
      }
    }
  };

  // Save clicked item in localStorage (limit 4)
  const saveToLocalStorage = (item) => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
      const existing = stored.filter((p) => p._id !== item._id);
      const updated = [item, ...existing].slice(0, 4);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      setSearchHistory(updated);
    } catch (err) {
      console.error("Error saving search history", err);
    }
  };

  // Handle selecting an item
  const handleSelect = (item) => {
    saveToLocalStorage(item);

    const trimmedQuery = query.trim().toLowerCase();
    const matchesName = item?.name?.trim().toLowerCase() === trimmedQuery;
    const matchesCategory = item?.category?.trim().toLowerCase() === trimmedQuery;

    if (matchesName) {
      window.location.href = `/products/${item._id}`;
      return;
    }

    if (matchesCategory) {
      window.location.href = `/categoryproducts?categoryName=${item.category}`;
      return;
    }

    // Default fallback
    window.location.href = `/categoryproducts?categoryName=${item.category}`;
  };

  // Clear input
  const clearQuery = () => {
    setQuery("");
    setResults([]);
    resetTranscript();
    if (searchHistory.length > 0) {
      setShowRecentSearches(true);
    } else {
      setShowRecentSearches(false);
    }
    inputRef.current?.focus();
  };

  // Clear localStorage history
  const clearHistory = () => {
    localStorage.removeItem("recentSearches");
    setSearchHistory([]);
    setShowRecentSearches(false);
  };

  // Toggle mic with speech recognition
  const toggleMic = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      setQuery("");
      setResults([]);
      setShowRecentSearches(false);
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
  };

  // Determine what to show
  const showDefaultContent = !showRecentSearches && query.trim() === "" && results.length === 0;
  const showSearchResults = query.trim() !== "" && !showRecentSearches;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-base text-gray-500 flex-1">Search Products</h1>
        </div>

        {/* Search Input */}
        <div className="flex items-center rounded-lg px-4 py-2 bg-white border-2 border-pink-500">
          <Search className="text-gray-500 mr-3" size={20} />
          <input
            ref={inputRef}
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Search for brands, products, or categories"
            className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm sm:text-base"
          />
          {query && (
            <button 
              onClick={clearQuery} 
              className="text-gray-400 hover:text-gray-600 mr-2" 
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={toggleMic}
            className={`transition ${listening ? "text-pink-500 animate-pulse" : "text-gray-500"}`}
            aria-label={listening ? "Stop listening" : "Start voice search"}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>

        {/* Voice Recognition Status */}
        {listening && (
          <div className="mt-2 text-xs text-pink-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            Listening...
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Recent Searches - Show when input is focused/empty and has history */}
        {showRecentSearches && searchHistory.length > 0 && (
          <div className="px-2 py-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-800">Recent Searches</h2>
              <button 
                onClick={clearHistory} 
                className="text-gray-400 hover:text-gray-600"
                aria-label="Clear history"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {searchHistory.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 group-hover:ring-2 group-hover:ring-pink-300 transition">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-700 mt-2 truncate w-full px-1">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Show CategorySlider and BeautyProductsGrid below recent searches */}
            <div className="mt-6">
              <CategorySlider />
              <BeautyProductsGrid />
            </div>
          </div>
        )}

        {/* Search Results */}
        {showSearchResults && (
          <div className="px-2 py-3">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Searching...</div>
            ) : results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No results found</div>
            )}
          </div>
        )}

        {/* Default Content - Show when no search and no recent searches */}
        {showDefaultContent && (
          <>
            <CategorySlider />
            <BeautyProductsGrid />
          </>
        )}
      </div>
    </div>
  );
};

export default FullScreenSearch;