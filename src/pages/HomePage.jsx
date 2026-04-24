import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { PropertyCard } from '../components/PropertyCard'
import { SearchBar } from '../components/SearchBar'
import { api, normalizeProperty } from '../services/api'

export function HomePage() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)

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
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
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
            <div
              className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-12 h-px bg-[var(--color-accent)]" />
              <span className="hero-ambient-text hero-secondary-text font-sans text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white font-medium">
                Premium Real Estate
              </span>
              <span className="w-12 h-px bg-[var(--color-accent)]" />
            </div>

            {/* Main Headline */}
            <h1
              className={`hero-ambient-text font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold text-white leading-[1.1] mb-6 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="block">Discover</span>
              <span className="block font-semibold">Exceptional Living</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`hero-ambient-text hero-secondary-text font-sans text-sm sm:text-base text-white max-w-xl mx-auto mb-14 leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Curated properties in the world&apos;s most sought-after locations.
              Where luxury meets lifestyle.
            </p>

            {/* Search Bar Container - Premium White Card */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <div className="relative max-w-2xl mx-auto">
                {/* Search bar with white card */}
                <div className="home-hero-search relative p-3 sm:p-4 shadow-xl border border-[var(--color-neutral-200)]">
                  <SearchBar
                    onSearch={({ query, location }) => {
                      const params = new URLSearchParams()
                      if (query) params.set('q', query)
                      if (location) params.set('loc', location)
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
          className="hero-ambient-text hero-secondary-text absolute bottom-10 left-1/2 z-10 -translate-x-1/2 group flex flex-col items-center gap-2 text-white hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
          <div className="relative w-6 h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-1 group-hover:border-white transition-colors">
            <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce mt-1 group-hover:bg-white" />
          </div>
        </button>

        {/* Side Decorative Elements */}
        <div className="absolute left-6 sm:left-10 top-1/2 z-10 -translate-y-1/2 hidden lg:flex flex-col gap-4 text-[var(--color-primary)]">
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
        </div>
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

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { number: '500+', label: 'Properties Sold' },
                  { number: '15+', label: 'Years Experience' },
                  { number: '98%', label: 'Client Satisfaction' },
                  { number: '24/7', label: 'Support Available' },
                ].map((stat) => (
                  <div key={stat.label} className="group">
                    <div className="font-serif text-3xl sm:text-4xl text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--color-neutral-500)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[var(--color-neutral-200)]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Luxury Interior"
                  className="block w-full h-full object-cover"
                />
              </div>

              {/* Floating testimonial card */}
              <div className="absolute -bottom-8 -left-8 why-section__testimonial p-6 sm:p-8 shadow-xl max-w-xs hidden sm:block">
                <div className="w-8 h-8 bg-[var(--color-accent)]/10 flex items-center justify-center rounded-sm mb-4">
                  <span className="font-serif text-2xl text-[var(--color-accent)]">&ldquo;</span>
                </div>
                <p className="font-serif text-lg text-[var(--color-primary)] italic leading-relaxed mb-4">
                  Exceptional service from start to finish.
                </p>
                <p className="font-sans text-xs text-[var(--color-neutral-500)] uppercase tracking-wider">
                  — Satisfied Client
                </p>
              </div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-[var(--color-accent)]/30 -z-10 rounded-sm" />
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
              Our team of experienced agents is ready to help you find the perfect property
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
      `}</style>
    </div>
  )
}