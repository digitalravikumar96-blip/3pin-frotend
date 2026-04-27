import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { PropertyCard } from '../components/PropertyCard'
import { api, normalizeProperty } from '../services/api'

const LOCATION_SUGGESTIONS = ['Medavakkam', 'Pallavaram', 'OMR', 'ECR', 'Adyar']

function highlightMatch(text, query) {
  if (!query) return text
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const matchIndex = lowerText.indexOf(lowerQuery)

  if (matchIndex === -1) return text

  const before = text.slice(0, matchIndex)
  const match = text.slice(matchIndex, matchIndex + query.length)
  const after = text.slice(matchIndex + query.length)

  return (
    <>
      {before}
      <span className="search-highlight">{match}</span>
      {after}
    </>
  )
}

function IntelligentSearch({
  suggestions = LOCATION_SUGGESTIONS,
  onSearch,
  onDropdownToggle,
}) {
  const wrapperRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    onDropdownToggle?.(isDropdownOpen)
  }, [isDropdownOpen, onDropdownToggle])

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
    if (!debouncedValue) return suggestions
    const query = debouncedValue.toLowerCase()
    return suggestions.filter((item) => item.toLowerCase().includes(query))
  }, [debouncedValue, suggestions])

  const flattenedSuggestions = useMemo(
    () => filteredSuggestions,
    [filteredSuggestions]
  )

  const runSearch = (value) => {
    const term = value.trim()
    onSearch?.(term)
    setIsDropdownOpen(false)
    setActiveSuggestionIndex(-1)
  }

  const handleSuggestionSelect = (value) => {
    setInputValue(value)
    setDebouncedValue(value)
    setSelectedValue(value)
    runSearch(value)
  }

  const handleInputKeyDown = (event) => {
    if (!isDropdownOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setIsDropdownOpen(true)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!flattenedSuggestions.length) return
      setActiveSuggestionIndex((prev) => (prev + 1) % flattenedSuggestions.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!flattenedSuggestions.length) return
      setActiveSuggestionIndex((prev) =>
        prev <= 0 ? flattenedSuggestions.length - 1 : prev - 1
      )
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (isDropdownOpen && activeSuggestionIndex >= 0 && flattenedSuggestions[activeSuggestionIndex]) {
        handleSuggestionSelect(flattenedSuggestions[activeSuggestionIndex])
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
    <div className="smart-search-wrapper" ref={wrapperRef}>
      <div className="smart-search-field">
        <input
          type="text"
          value={inputValue}
          placeholder="Search location, property, or area"
          onFocus={() => setIsDropdownOpen(true)}
          onChange={(event) => {
            setInputValue(event.target.value)
            setIsDropdownOpen(true)
            setActiveSuggestionIndex(-1)
          }}
          onKeyDown={handleInputKeyDown}
          className="smart-search-input"
        />
      </div>

      {isDropdownOpen && (
        <div className="smart-search-dropdown" role="listbox">
          {flattenedSuggestions.length ? (
            <ul className="smart-search-list">
              {flattenedSuggestions.map((item, optionIndex) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`smart-search-option ${optionIndex === activeSuggestionIndex ? 'active' : ''} ${selectedValue === item ? 'selected' : ''}`}
                    onMouseEnter={() => setActiveSuggestionIndex(optionIndex)}
                    onClick={() => handleSuggestionSelect(item)}
                  >
                    <MapPinIcon className="smart-search-option-icon" aria-hidden="true" />
                    <span>{highlightMatch(item, debouncedValue)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="smart-search-empty">No results found</p>
          )}
        </div>
      )}
    </div>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const testimonials = [
    {
      text: "Handled a complex sale smoothly with constant follow-up and attention to detail.",
      author: "Anita Aditya",
    },
    {
      text: "Seamless process from property visits to paperwork. Always responsive and professional.",
      author: "Mangalakrishnan Balasoundarapandian",
    },
    {
      text: "Punctual, reliable, and true to his word. A smooth experience overall.",
      author: "Prabhu R",
    },
  ]
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [animDir, setAnimDir] = useState(null)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setAnimDir('next')
      setAnimating(true)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setAnimating(false)
      }, 350)
    }, 4000)
    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  const prevTestimonial = () => {
    setAnimDir('prev')
    setAnimating(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setAnimating(false)
    }, 350)
  }

  const nextTestimonial = () => {
    setAnimDir('next')
    setAnimating(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setAnimating(false)
    }, 350)
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    setError('')
    api.get('/api/property')
      .then(res => {
        // const all = (res.data?.data || []).map(normalizeProperty)
        const featured = (res.data?.data.filter(p => p.featured === true) || []).map(normalizeProperty)
        setFeatured(featured)
      })
      .catch(() => setError('Failed to load featured properties.'))
      .finally(() => setLoading(false))
  }, [])

  // Trigger hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const node = statsRef.current
    if (!node || shouldAnimateStats) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShouldAnimateStats(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimateStats(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldAnimateStats])

  const stats = [
    { value: 1000, suffix: '+', label: 'Properties Sold' },
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 100, suffix: '+', label: 'Locations Covers' },
    { value: '24/7', label: 'Support Available' },
  ]

  const scrollToContent = () => {
    const element = document.getElementById('featured-properties')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      {/* Hero Section - Light Luxury */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://www.compass.com/ucfe-assets/homepage/homepage-v4.18.5/assets/hero_desktop2x_res.jpg"
            alt="Luxury Home"
            className="hero-bg-image w-full h-full object-cover scale-105"
          />

          {/* Subtle dark overlay for crisp text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full luxury-container px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Label Badge */}
            {/* <div
              className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-12 h-px bg-[var(--color-accent)]" />
              <span className="hero-ambient-text hero-secondary-text font-sans text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white font-medium">
                Premium Real Estate
              </span>
              <span className="w-12 h-px bg-[var(--color-accent)]" />
            </div> */}

            {/* Main Headline */}
            <h1
              className={`hero-ambient-text font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold text-white leading-[1.1] -mt-6 sm:-mt-8 mb-5 sm:mb-6 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="block">Let's Get You Home</span>
              {/* <span className="font-semibold">Get You Home</span> */}
            </h1>

            {/* Subheadline */}
            {/* <p
              className={`hero-ambient-text hero-secondary-text font-sans text-sm sm:text-base text-white max-w-xl mx-auto mb-14 leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Curated properties just for you.
            </p> */}

            {/* Search Bar Container - Premium White Card */}
            <div
              className={`mt-10 sm:mt-12 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <div className="relative max-w-3xl mx-auto">
                {/* Unified hero search bar */}
                <div className="relative">
                  <IntelligentSearch
                    suggestions={LOCATION_SUGGESTIONS}
                    onDropdownToggle={setIsSearchDropdownOpen}
                    onSearch={(term) => {
                      const params = new URLSearchParams()
                      if (term) {
                        params.set('q', term)
                        params.set('loc', term)
                      }
                      navigate(`/listings?${params.toString()}`)
                    }}
                  />
                </div>
              </div>

              {/* Popular Locations — frosted chip so links stay readable over pool/reflections */}
              {/* <div className="mt-6 flex justify-center px-2">
                <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-white/70 bg-white/88 px-4 py-2.5 shadow-lg shadow-[var(--color-primary)]/10 backdrop-blur-sm">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-primary)]/80">
                    Popular
                  </span>
                  {['Ikoyi', 'Victoria Island', 'Lekki', 'Banana Island'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => navigate(`/listings?loc=${encodeURIComponent(loc)}`)}
                      className="text-xs font-medium text-[var(--color-primary)] underline underline-offset-2 decoration-[var(--color-neutral-300)] transition-colors duration-200 hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToContent}
          className={`hero-ambient-text hero-secondary-text absolute bottom-6 sm:bottom-8 left-1/2 z-10 -translate-x-1/2 group flex flex-col items-center gap-2 text-white hover:text-white transition-colors duration-300 cursor-pointer ${
            isSearchDropdownOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
          <div className="relative w-6 h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-1 group-hover:border-white transition-colors">
            <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce mt-1 group-hover:bg-white" />
          </div>
        </button>

        {/* Side Decorative Elements */}
        {/* <div className="absolute left-6 sm:left-10 top-1/2 z-10 -translate-y-1/2 hidden lg:flex flex-col gap-4 text-[var(--color-primary)]">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[var(--color-primary)]/35 to-transparent" />
          <span className="hero-ambient-text font-sans text-[10px] uppercase tracking-[0.3em] font-medium -rotate-90 origin-center whitespace-nowrap translate-x-[-1.5rem]">
            Est. 2009
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[var(--color-primary)]/35 to-transparent" />
        </div>

        <div className="absolute right-6 sm:right-10 top-1/2 z-10 -translate-y-1/2 hidden lg:flex flex-col gap-4 text-[var(--color-primary)]">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[var(--color-primary)]/35 to-transparent" />
          <span className="hero-ambient-text font-sans text-[10px] uppercase tracking-[0.3em] font-medium rotate-90 origin-center whitespace-nowrap translate-x-[1.5rem]">
            Lagos, Nigeria
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[var(--color-primary)]/35 to-transparent" />
        </div> */}
      </section>

      {/* Featured Properties Section - Light */}
      <section id="featured-properties" className="featured-section py-20 sm:py-28">
        <div className="luxury-container">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4 font-medium">
                Curated Selection
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--color-primary)] leading-tight">
                Featured Properties
              </h2>
              <p className="font-sans text-sm text-[var(--color-neutral-500)] mt-4 max-w-md leading-relaxed">
                Hand-picked residences representing the finest in design, location, and lifestyle.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/listings')}
              className="properties-view-all group"
            >
              View All
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Property Grid */}
          <div className="prop-grid">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <div className="w-10 h-10 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-sans text-sm text-[var(--color-neutral-500)]">Loading properties...</p>
              </div>
            ) : error ? (
              <div className="col-span-full py-20 text-center">
                <p className="font-sans text-sm text-red-500">{error}</p>
              </div>
            ) : featured.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="font-sans text-sm text-[var(--color-neutral-500)]">No featured properties found.</p>
              </div>
            ) : (
              featured.slice(0, 6).map((p, index) => (
                <div
                  key={p.id || p._id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <PropertyCard property={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Beige Background */}
      <section className="why-section py-20 sm:py-28">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4 font-medium">
                Why Three Pin
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--color-primary)] leading-tight mb-6">
                Excellence in Every Detail
              </h2>
              <div className="w-16 h-px bg-[var(--color-accent)] mb-8" />
              <p className="font-sans text-[15px] text-[var(--color-neutral-600)] leading-[1.8] mb-10">
                We believe that finding a home should be an experience of excellence. Our curated
                portfolio represents only the most exceptional properties, hand-selected for their
                quality, location, and investment potential.
              </p>

              <div ref={statsRef} className="grid sm:grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="group">
                    <div className="font-serif text-3xl sm:text-4xl text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {typeof stat.value === 'number' ? (
                        <CountUpNumber
                          end={stat.value}
                          suffix={stat.suffix}
                          start={shouldAnimateStats}
                        />
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--color-neutral-500)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-full">
              <div className="relative aspect-[4/5] overflow-visible rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Luxury Interior"
                  className="block w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* Floating testimonial carousel */}
              <div
                className="absolute -bottom-10 -left-12 why-section__testimonial p-8 shadow-2xl max-w-[17rem] hidden lg:block z-10"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Arrows */}
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="testimonial-arrow testimonial-arrow-prev"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="testimonial-arrow testimonial-arrow-next"
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>

                {/* Quote icon */}
                <div className="w-7 h-7 bg-[var(--color-accent)]/10 flex items-center justify-center rounded-sm mb-5">
                  <span className="font-serif text-xl text-[var(--color-accent)]">&ldquo;</span>
                </div>

                {/* Testimonial text */}
                <p
                  className={`font-serif text-base text-[var(--color-primary)] italic leading-relaxed mb-5 transition-all duration-300 ${
                    animating
                      ? `opacity-0 ${animDir === 'next' ? '-translate-x-4' : 'translate-x-4'}`
                      : 'opacity-100 translate-x-0'
                  }`}
                >
                  {testimonials[currentTestimonial].text}
                </p>

                {/* Author */}
                <p
                  className={`font-sans text-[10px] text-[var(--color-neutral-500)] uppercase tracking-[0.18em] mb-8 transition-all duration-300 delay-75 ${
                    animating ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  — {testimonials[currentTestimonial].author}
                </p>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setAnimDir(i > currentTestimonial ? 'next' : 'prev')
                        setAnimating(true)
                        setTimeout(() => {
                          setCurrentTestimonial(i)
                          setAnimating(false)
                        }, 300)
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentTestimonial
                          ? 'w-4 h-1.5 bg-[var(--color-accent)]'
                          : 'w-1.5 h-1.5 bg-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-400)]'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-[var(--color-accent)]/30 -z-10 rounded-sm" />

              {/* Floating testimonial — mobile (below image) */}
              <div
                className="lg:hidden mt-6 p-5 bg-white rounded-sm shadow-lg"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="w-6 h-6 bg-[var(--color-accent)]/10 flex items-center justify-center rounded-sm mb-3">
                  <span className="font-serif text-lg text-[var(--color-accent)]">&ldquo;</span>
                </div>
                <p
                  className={`font-serif text-sm text-[var(--color-primary)] italic leading-relaxed mb-3 transition-all duration-300 ${
                    animating
                      ? `opacity-0 ${animDir === 'next' ? '-translate-x-4' : 'translate-x-4'}`
                      : 'opacity-100 translate-x-0'
                  }`}
                >
                  {testimonials[currentTestimonial].text}
                </p>
                <p
                  className={`font-sans text-[9px] text-[var(--color-neutral-500)] uppercase tracking-[0.18em] mb-4 transition-all duration-300 delay-75 ${
                    animating ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  — {testimonials[currentTestimonial].author}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={prevTestimonial}
                    className="w-6 h-6 rounded-full border border-[var(--color-neutral-200)] flex items-center justify-center text-[var(--color-neutral-400)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeftIcon className="w-3 h-3" />
                  </button>
                  <div className="flex items-center justify-center gap-1.5 mx-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setAnimDir(i > currentTestimonial ? 'next' : 'prev')
                          setAnimating(true)
                          setTimeout(() => {
                            setCurrentTestimonial(i)
                            setAnimating(false)
                          }, 300)
                        }}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentTestimonial
                            ? 'w-4 h-1.5 bg-[var(--color-accent)]'
                            : 'w-1.5 h-1.5 bg-[var(--color-neutral-300)]'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    className="w-6 h-6 rounded-full border border-[var(--color-neutral-200)] flex items-center justify-center text-[var(--color-neutral-400)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRightIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — matches Featured / Why (light luxury) */}
      <section className="py-20 sm:py-28 bg-[var(--color-secondary)] border-t border-[var(--color-neutral-200)]">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4 font-medium">
              Ready to Find Your Home?
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--color-primary)] mb-6 leading-tight font-normal">
              Let&apos;s Start Your Journey
            </h2>
            <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mb-8" />
            <p className="font-sans text-sm sm:text-base text-[var(--color-neutral-600)] max-w-lg mx-auto mb-12 leading-relaxed">
              Our team is ready to help you find the perfect property
              that matches your lifestyle and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" onClick={() => navigate('/listings')} className="luxury-button luxury-button-primary">
                Browse Properties
              </button>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="luxury-button luxury-button-secondary"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add animation keyframes */}
      <style>{`
        .hero-ambient-text {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .hero-secondary-text {
          opacity: 0.9;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .smart-search-wrapper {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          position: relative;
        }
        .smart-search-field {
          display: flex;
          align-items: center;
          padding: 0.2rem 0.35rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-radius: 999px;
        }
        .smart-search-input {
          flex: 1;
          border: 0;
          background: transparent;
          color: #111111;
          font-size: 0.95rem;
          padding: 1rem 1.15rem;
          font-weight: 400;
          outline: none;
        }
        .smart-search-input::placeholder {
          color: #8a8a8a;
        }
        .smart-search-dropdown {
          margin: 8px 0 0;
          padding: 0.28rem;
          position: absolute;
          top: 100%;
          width: 100%;
          z-index: 30;
          max-height: 224px;
          overflow-y: auto;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          animation: dropdown-enter 180ms ease-out;
        }
        .smart-search-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .smart-search-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          text-align: left;
          border: 0;
          border-radius: 8px;
          padding: 12px 16px;
          background: transparent;
          color: #111111;
          font-weight: 400;
          cursor: pointer;
          transition: background-color 160ms ease, color 160ms ease;
        }
        .smart-search-option-icon {
          width: 14px;
          height: 14px;
          color: #9ca3af;
          opacity: 0.95;
        }
        .smart-search-option:hover,
        .smart-search-option.active {
          background: #f5f5f5;
        }
        .smart-search-option.active {
          background: #eeeeee;
        }
        .smart-search-option.selected {
          color: #111111;
          font-weight: 500;
        }
        .smart-search-empty {
          margin: 0;
          padding: 0.65rem 0.7rem;
          color: #666666;
          font-size: 0.85rem;
          font-weight: 400;
        }
        .search-highlight {
          color: #111111;
          font-weight: 600;
        }
        @keyframes dropdown-enter {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 640px) {
          .smart-search-input {
            padding: 0.92rem 1rem;
          }
          .smart-search-dropdown {
            top: calc(100% + 0.35rem);
          }
        }
        /* Testimonial carousel */
        .why-section__testimonial {
          background: #ffffff;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
        .testimonial-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--color-neutral-400);
          background: transparent;
          opacity: 0.45;
          transition: opacity 0.25s ease, transform 0.25s ease, color 0.25s ease;
          z-index: 2;
        }
        .testimonial-arrow:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
          color: var(--color-accent);
        }
        .testimonial-arrow-prev {
          left: -42px;
        }
        .testimonial-arrow-next {
          right: -42px;
        }
        @media (max-width: 900px) {
          .testimonial-arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

function CountUpNumber({ end, suffix = '', start, durationMs = 1200 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    let animationFrameId
    const startAt = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startAt) / durationMs, 1)
      // Ease-out for smooth finishing motion.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate)
      }
    }

    animationFrameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [durationMs, end, start])

  return `${value.toLocaleString()}${suffix}`
}