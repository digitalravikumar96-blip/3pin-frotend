import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'

export function SearchBar({ initialQuery = '', initialLocation = '', onSearch, compact = false }) {
  const [query, setQuery] = useState(() => initialQuery)
  const [location, setLocation] = useState(() => initialLocation)

  const canSearch = useMemo(() => Boolean(query.trim() || location.trim()), [query, location])

  function submit(e) {
    e?.preventDefault?.()
    onSearch?.({ query: query.trim(), location: location.trim() })
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className={`grid gap-2 ${compact ? 'sm:grid-cols-[1fr_1fr_auto]' : 'sm:grid-cols-[1.2fr_1fr_auto]'} sm:items-center`}>
        {/* Search Input */}
        <div className="relative group">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by keyword"
            className="w-full bg-[var(--color-secondary)] border border-[var(--color-neutral-200)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(198,168,75,0.15)] px-4 py-3.5 font-sans text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none transition-all duration-200 rounded-sm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[10px] text-[var(--color-neutral-400)] uppercase tracking-wider hidden sm:block pointer-events-none">
            Keyword
          </span>
        </div>

        {/* Location Input */}
        <div className="relative group">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full bg-[var(--color-secondary)] border border-[var(--color-neutral-200)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(198,168,75,0.15)] px-4 py-3.5 font-sans text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none transition-all duration-200 rounded-sm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[10px] text-[var(--color-neutral-400)] uppercase tracking-wider hidden sm:block pointer-events-none">
            Location
          </span>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={!canSearch}
          className="bg-[var(--color-accent)] text-white px-6 py-3.5 font-sans text-xs uppercase tracking-[0.08em] font-medium hover:bg-[var(--color-accent-dark)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm shadow-md hover:shadow-lg"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          <span className="sm:hidden">Search</span>
        </button>
      </div>
    </form>
  )
}