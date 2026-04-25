import { MagnifyingGlassIcon, MapPinIcon, BuildingOffice2Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'

const PROPERTY_TYPES = ['Any Type', 'Apartment', 'Villa', 'Penthouse', 'Townhouse']

export function SearchBar({
  initialQuery = '',
  initialLocation = '',
  initialPropertyType = '',
  onSearch,
  compact = false,
  variant = 'default',
}) {
  const [query, setQuery] = useState(() => initialQuery)
  const [location, setLocation] = useState(() => initialLocation)
  const [propertyType, setPropertyType] = useState(() => initialPropertyType)

  const canSearch = useMemo(
    () => Boolean(query.trim() || location.trim() || propertyType.trim()),
    [query, location, propertyType]
  )

  function submit(e) {
    e?.preventDefault?.()
    onSearch?.({
      query: query.trim(),
      location: location.trim(),
      propertyType: propertyType.trim(),
    })
  }

  const isHero = variant === 'hero'
  const isUnifiedHero = variant === 'heroUnified'
  const gridClass = isHero
    ? 'lg:grid-cols-[1.1fr_1fr_0.9fr_auto]'
    : compact
      ? 'sm:grid-cols-[1fr_1fr_auto]'
      : 'sm:grid-cols-[1.2fr_1fr_auto]'
  const fieldBaseClass = isHero
    ? 'w-full h-14 bg-white border border-[var(--color-neutral-200)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.12)] px-4 py-3.5 font-sans text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none transition-all duration-300 rounded-md'
    : 'w-full bg-[var(--color-secondary)] border border-[var(--color-neutral-200)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(198,168,75,0.15)] px-4 py-3.5 font-sans text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none transition-all duration-200 rounded-sm'

  if (isUnifiedHero) {
    return (
      <form onSubmit={submit} className="w-full">
        <div className="group flex w-full items-center rounded-full bg-white p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 focus-within:shadow-[0_18px_44px_rgba(0,0,0,0.16)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.16)]">
          <div className="relative flex min-w-0 flex-1 items-center px-4">
            <MagnifyingGlassIcon className="h-4 w-4 shrink-0 text-[var(--color-neutral-400)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Keyword"
              className="h-12 w-full bg-transparent px-3 font-sans text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none"
            />
          </div>

          <span className="h-[60%] w-px bg-black/10" />

          <div className="relative flex min-w-0 flex-1 items-center px-4">
            <MapPinIcon className="h-4 w-4 shrink-0 text-[var(--color-neutral-400)]" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="h-12 w-full bg-transparent px-3 font-sans text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canSearch}
            className="ml-2 inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] px-6 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[var(--color-primary-800)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Search
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className={`grid gap-3 ${gridClass} sm:items-center`}>
        {/* Search Input */}
        <div className="relative group">
          {isHero ? (
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)] pointer-events-none" />
          ) : null}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by keyword"
            className={`${fieldBaseClass} ${isHero ? 'pl-11' : ''}`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[10px] text-[var(--color-neutral-400)] uppercase tracking-wider hidden sm:block pointer-events-none">
            Keyword
          </span>
        </div>

        {/* Location Input */}
        <div className="relative group">
          {isHero ? (
            <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)] pointer-events-none" />
          ) : null}
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={`${fieldBaseClass} ${isHero ? 'pl-11' : ''}`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[10px] text-[var(--color-neutral-400)] uppercase tracking-wider hidden sm:block pointer-events-none">
            Location
          </span>
        </div>

        {isHero ? (
          <div className="relative group">
            <BuildingOffice2Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)] pointer-events-none" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className={`${fieldBaseClass} pl-11 pr-10 appearance-none`}
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type === 'Any Type' ? '' : type} className="text-slate-800">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)] pointer-events-none" />
          </div>
        ) : null}

        {/* Search Button */}
        <button
          type="submit"
          disabled={!canSearch}
          className={isHero
            ? 'bg-[var(--color-primary)] text-white px-6 h-14 font-sans text-xs uppercase tracking-[0.08em] font-semibold hover:bg-[var(--color-primary-800)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-md shadow-md'
            : 'bg-[var(--color-accent)] text-white px-6 py-3.5 font-sans text-xs uppercase tracking-[0.08em] font-medium hover:bg-[var(--color-accent-dark)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm shadow-md hover:shadow-lg'
          }
        >
          {isHero ? <span>Search Properties</span> : (
            <>
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span className="sm:hidden">Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}