import { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FunnelIcon, ArrowDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FilterSidebar } from '../components/FilterSidebar'
import { PropertyCard } from '../components/PropertyCard'
import { api, normalizeProperty } from '../services/api'
import { parsePriceToNumber } from '../data/properties'

function includes(haystack, needle) {
  return String(haystack || '').toLowerCase().includes(String(needle || '').toLowerCase())
}

function UnifiedListingSearch({ value, suggestions, onSearch }) {
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState(value || '')
  const [debouncedValue, setDebouncedValue] = useState(value || '')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)

  useEffect(() => {
    setInputValue(value || '')
    setDebouncedValue(value || '')
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsDropdownOpen(false)
        setActiveSuggestionIndex(-1)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const filteredSuggestions = useMemo(() => {
    const query = debouncedValue.toLowerCase()
    if (!query) return suggestions.slice(0, 12)
    return suggestions.filter((item) => item.toLowerCase().includes(query)).slice(0, 12)
  }, [debouncedValue, suggestions])

  const runSearch = (nextValue) => {
    onSearch?.(nextValue.trim())
    setIsDropdownOpen(false)
    setActiveSuggestionIndex(-1)
  }

  const handleSuggestionSelect = (nextValue) => {
    setInputValue(nextValue)
    setDebouncedValue(nextValue)
    runSearch(nextValue)
  }

  const handleInputKeyDown = (event) => {
    if (!isDropdownOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setIsDropdownOpen(true)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!filteredSuggestions.length) return
      setActiveSuggestionIndex((prev) => (prev + 1) % filteredSuggestions.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!filteredSuggestions.length) return
      setActiveSuggestionIndex((prev) => (prev <= 0 ? filteredSuggestions.length - 1 : prev - 1))
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (isDropdownOpen && activeSuggestionIndex >= 0 && filteredSuggestions[activeSuggestionIndex]) {
        handleSuggestionSelect(filteredSuggestions[activeSuggestionIndex])
        return
      }
      runSearch(inputValue)
    }

    if (event.key === 'Escape') {
      setIsDropdownOpen(false)
      setActiveSuggestionIndex(-1)
    }
  }

  return (
    <div className="listing-search-wrapper" ref={wrapperRef}>
      <div className="listing-search-field">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder="Search location, property, or area"
          onFocus={() => setIsDropdownOpen(true)}
          onChange={(event) => {
            const nextValue = event.target.value
            setInputValue(nextValue)
            setIsDropdownOpen(true)
            setActiveSuggestionIndex(-1)
            if (!nextValue.trim() && inputValue.trim()) {
              runSearch('')
            }
          }}
          onKeyDown={handleInputKeyDown}
          className="listing-search-input"
        />
        {inputValue && (
          <button
            type="button"
            className="listing-search-clear"
            aria-label="Clear search"
            onClick={() => {
              setInputValue('')
              setDebouncedValue('')
              runSearch('')
              inputRef.current?.focus()
            }}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
        <MagnifyingGlassIcon className="listing-search-icon" aria-hidden="true" />
      </div>

      {isDropdownOpen && (
        <div className="listing-search-dropdown" role="listbox">
          {filteredSuggestions.length ? (
            <ul className="listing-search-list">
              {filteredSuggestions.map((item, optionIndex) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`listing-search-option ${optionIndex === activeSuggestionIndex ? 'active' : ''}`}
                    onMouseEnter={() => setActiveSuggestionIndex(optionIndex)}
                    onClick={() => handleSuggestionSelect(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="listing-search-empty">No suggestions found</p>
          )}
        </div>
      )}
    </div>
  )
}

export function ListingsPage() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    api.get('/api/property')
      .then(res => setProperties((res.data?.data || []).map(normalizeProperty)))
      .catch(() => setProperties([]))
  }, [])

  const q = params.get('q') || ''
  const loc = params.get('loc') || ''
  const cashbackOnly = params.get('cashbackEligible') === '1'

  const [filters, setFilters] = useState({
    location: '',
    budget: 0,
    type: '',
    cashbackEligible: cashbackOnly,
  })
  const [sortBy, setSortBy] = useState('price')
  const unifiedQuery = q || loc

  const searchSuggestions = useMemo(() => {
    const unique = new Set()
    properties.forEach((property) => {
      if (property.location) unique.add(property.location)
      if (property.type) unique.add(property.type)
      if (property.title) unique.add(property.title)
      if (property.projectName) unique.add(property.projectName)
    })
    return [...unique].filter(Boolean)
  }, [properties])

  const results = useMemo(() => {
    const filtered = properties.filter((p) => {
      if (q && !(includes(p.title, q) || includes(p.type, q) || includes(p.description, q) || includes(p.location, q)))
        return false
      if (loc && !includes(p.location, loc)) return false
      if (filters.location && !includes(p.location, filters.location)) return false
      if (filters.type && p.type !== filters.type) return false
      if (filters.cashbackEligible && !p.cashbackEligible) return false
      if (filters.budget) {
        const priceNum = parsePriceToNumber(p.price)
        if (priceNum != null && priceNum > filters.budget) return false
      }
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        const aDate = new Date(a.createdAt || 0).getTime()
        const bDate = new Date(b.createdAt || 0).getTime()
        return bDate - aDate
      }
      if (sortBy === 'delivery') {
        const aDate = a.deliveryDate ? new Date(a.deliveryDate).getTime() : Infinity
        const bDate = b.deliveryDate ? new Date(b.deliveryDate).getTime() : Infinity
        return aDate - bDate
      }
      const aPrice = parsePriceToNumber(a.price)
      const bPrice = parsePriceToNumber(b.price)
      if (aPrice == null && bPrice == null) return 0
      if (aPrice == null) return 1
      if (bPrice == null) return -1
      return aPrice - bPrice
    })
  }, [q, loc, filters, sortBy, properties])

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      {/* Page Header - Light Elegance */}
      <div className="bg-[var(--color-secondary-200)] py-16 sm:py-20 border-b border-[var(--color-neutral-200)]">
        <div className="luxury-container">
          <div className="max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 font-medium">
              Property Listings
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-primary)] mb-4">
              Find Your Perfect Property
            </h1>
            <p className="font-sans text-sm text-[var(--color-neutral-500)]">
              Browse our curated collection of exceptional homes and investment opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="properties-section">
        {/* Floating Filter Panel */}
        <div className="luxury-container">
          <div className="properties-filter-panel -mt-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="flex-1 min-w-0">
                <div className="py-2 sm:py-3">
                  <UnifiedListingSearch
                    value={unifiedQuery}
                    suggestions={searchSuggestions}
                    onSearch={(term) => {
                      const next = new URLSearchParams(params)
                      if (term) {
                        next.set('q', term)
                        next.set('loc', term)
                      } else {
                        next.delete('q')
                        next.delete('loc')
                      }
                      setParams(next)
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="luxury-button luxury-button-secondary properties-section__filter-button text-xs py-2.5 px-4"
                >
                  <FunnelIcon className="w-4 h-4 mr-1.5" />
                  Filters
                </button>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="luxury-input properties-section__sort text-xs py-2.5 pr-10 cursor-pointer appearance-none min-w-[160px]"
                  >
                    <option value="price">Price: Low to High</option>
                    <option value="newest">Newest First</option>
                    <option value="delivery">Completion Date</option>
                  </select>
                  <ArrowDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-400)] pointer-events-none" />
                </div>

                <span className="font-sans text-xs text-[var(--color-neutral-500)]">
                  {results.length} properties
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="luxury-container py-10">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            {showFilters && (
              <aside className="w-72 flex-shrink-0 hidden lg:block">
                <div className="properties-section__sidebar p-6 sticky top-28">
                  <h3 className="font-serif text-lg text-[var(--color-primary)] mb-6">Filters</h3>
                  <FilterSidebar
                    filters={filters}
                    onChange={(next) => {
                      setFilters(next)
                    }}
                  />
                </div>
              </aside>
            )}

            {/* Property Grid */}
            <div className={`flex-1 ${showFilters ? '' : 'w-full'}`}>
              {results.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-md border border-[var(--color-neutral-200)]">
                  <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mb-6" />
                  <h3 className="font-serif text-xl text-[var(--color-primary)] mb-2">No properties found</h3>
                  <p className="font-sans text-sm text-[var(--color-neutral-500)] mb-8">
                    Try adjusting your search criteria or filters.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({ location: '', budget: 0, type: '', cashbackEligible: false })
                      setParams(new URLSearchParams())
                    }}
                    className="luxury-button luxury-button-secondary properties-section__filter-button"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="prop-grid">
                  {results.map((p) => (
                    <PropertyCard key={p.id || p._id} property={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .listing-search-wrapper {
          position: relative;
          width: 100%;
          max-width: 100%;
        }
        .listing-search-field {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          min-height: 56px;
        }
        .listing-search-input {
          width: 100%;
          border: 0;
          outline: none;
          background: transparent;
          font-size: 0.95rem;
          color: #111111;
          padding: 0.95rem 5.2rem 0.95rem 1.15rem;
          border-radius: 999px;
        }
        .listing-search-clear {
          position: absolute;
          right: 2.7rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.6rem;
          height: 1.6rem;
          border: 0;
          border-radius: 999px;
          background: #f3f4f6;
          color: #6b7280;
          cursor: pointer;
          transition: background-color 160ms ease, color 160ms ease;
        }
        .listing-search-clear:hover {
          background: #e5e7eb;
          color: #374151;
        }
        .listing-search-input::placeholder {
          color: #8a8a8a;
        }
        .listing-search-icon {
          width: 18px;
          height: 18px;
          position: absolute;
          right: 1rem;
          color: #9ca3af;
          pointer-events: none;
        }
        .listing-search-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          width: 100%;
          z-index: 30;
          max-height: 280px;
          overflow-y: auto;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
          padding: 0.3rem;
        }
        .listing-search-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .listing-search-option {
          width: 100%;
          text-align: left;
          border: 0;
          background: transparent;
          border-radius: 8px;
          padding: 0.7rem 0.85rem;
          font-size: 0.92rem;
          color: #111111;
          cursor: pointer;
          transition: background-color 160ms ease;
        }
        .listing-search-option:hover,
        .listing-search-option.active {
          background: #f5f5f5;
        }
        .listing-search-empty {
          margin: 0;
          padding: 0.7rem 0.85rem;
          color: #666666;
          font-size: 0.87rem;
        }
        @media (max-width: 640px) {
          .listing-search-input {
            font-size: 0.92rem;
            padding: 0.9rem 4.8rem 0.9rem 1rem;
          }
          .listing-search-clear {
            right: 2.5rem;
          }
          .listing-search-dropdown {
            left: 0;
            right: 0;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}