import React, { useState } from 'react';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const Search = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Movies');

  const filters = ['Movies', 'Series', 'Account'];

  return (
    <div className="flex-1 bg-base min-h-screen text-primary p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Search</h1>
          <p className="text-secondary">Find your favorite movies, series, or user accounts.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-muted group-focus-within:text-accent transition-colors">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="w-full bg-surface border-2 border-[var(--color-border)] text-primary rounded-xl py-4 pl-14 pr-6 text-lg focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-muted"
            placeholder={`Search for ${filter.toLowerCase()}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 border ${
                filter === f
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary-glow)]'
                  : 'bg-elevated text-secondary border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-strong)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results Area Placeholder */}
        <div className="mt-8 border-t border-[var(--color-border)] pt-8">
          {query ? (
            <p className="text-muted">Searching for "{query}" in {filter}...</p>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center mb-4">
                <SearchIcon />
              </div>
              <h2 className="text-2xl font-semibold text-secondary mb-2">Start typing to search</h2>
              <p className="text-muted max-w-sm">Enter a keyword above to discover {filter.toLowerCase()} available on AuroraStream.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Search;
