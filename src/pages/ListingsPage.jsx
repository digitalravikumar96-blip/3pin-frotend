import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FunnelIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { FilterSidebar } from '../components/FilterSidebar'
import { PropertyCard } from '../components/PropertyCard'
import { SearchBar } from '../components/SearchBar'
import { api, normalizeProperty } from '../services/api'
import { parsePriceToNumber } from '../data/properties'

function includes(haystack, needle) {
  return String(haystack || '').toLowerCase().includes(String(needle || '').toLowerCase())
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

  const [filters, setFilters] = useState({
    location: '',
    budget: 0,
    type: '',
  })
  const [sortBy, setSortBy] = useState('price')

  const results = useMemo(() => {
    const filtered = properties.filter((p) => {
      if (q && !(includes(p.title, q) || includes(p.type, q) || includes(p.description, q) || includes(p.location, q)))
        return false
      if (loc && !includes(p.location, loc)) return false
      if (filters.location && !includes(p.location, filters.location)) return false
      if (filters.type && p.type !== filters.type) return false
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
                <SearchBar
                  compact
                  initialQuery={q}
                  initialLocation={loc}
                  onSearch={({ query, location }) => {
                    const next = new URLSearchParams(params)
                    query ? next.set('q', query) : next.delete('q')
                    location ? next.set('loc', location) : next.delete('loc')
                    setParams(next)
                  }}
                />
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
                      setFilters({ location: '', budget: 0, type: '' })
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
    </div>
  )
}