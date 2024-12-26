import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const SearchBar = ({ onSearchResults }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const handleSearch = async () => {
    if (query.trim() === "") {
      alert("Please enter a search query");
      return;
    }
  
    setLoading(true);
    setError(null);
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=f35dfaec`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      const data = await response.json();
      if (data.Response === "True") {
        onSearchResults(data.Search); // Pass results up to the parent component
      } else {
        setError(data.Error || "No movies found");
      }
    } catch (error) {
      setError("Error fetching movie. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <div class="flex flex-col lg:flex-row items-center mb-4 lg:border lg:border-gray-500 rounded-lg overflow-hidden shadow-lg  w-full max-w-4xl mt-[-7%]">
        <div class="relative w-full md:w-auto flex-grow lg:border-none md:border md:border-gray-500 ">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search your movies here"
            className="p-4 outline-none ml-10 w-full md:w-70 border-b md:border-b-0 md:border-r border-gray-200 mt-1 text-base text-gray-1000"
          />
          <button onClick={handleSearch} className="p-2 m-2 ">
            <FaSearch size={25} />
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default SearchBar;
