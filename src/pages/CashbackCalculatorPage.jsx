import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SparklesIcon, HomeIcon, ArrowRightIcon, CalculatorIcon, ReceiptPercentIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

const MIN_PURCHASE_PRICE = 50_00_000 // 50 Lakhs
const MAX_PURCHASE_PRICE = 5_00_00_000 // 5 Crores

const CASHBACK_PERCENTAGE = 0.004 // 0.4%

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN').format(Math.round(amount))
}

function calculateCashback(purchasePrice) {
  const price = clamp(purchasePrice, MIN_PURCHASE_PRICE, MAX_PURCHASE_PRICE)
  return Math.round(price * CASHBACK_PERCENTAGE)
}

function getRangePercent(purchasePrice) {
  const price = clamp(purchasePrice, MIN_PURCHASE_PRICE, MAX_PURCHASE_PRICE)
  const pct = ((price - MIN_PURCHASE_PRICE) / (MAX_PURCHASE_PRICE - MIN_PURCHASE_PRICE)) * 100
  return clamp(pct, 0, 100)
}

export function CashbackCalculatorPage() {
  const navigate = useNavigate()
  const [purchasePrice, setPurchasePrice] = useState(MIN_PURCHASE_PRICE)
  const [isHovered, setIsHovered] = useState(false)

  const cashback = useMemo(() => calculateCashback(purchasePrice), [purchasePrice])
  const rangePercent = useMemo(() => getRangePercent(purchasePrice), [purchasePrice])

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      {/* Hero — same header rhythm as Home featured / listings */}
      <section className="relative bg-[var(--color-secondary)] py-16 sm:py-24 border-b border-[var(--color-neutral-200)]">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[var(--color-accent)]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium">
                Exclusive Offer
              </span>
              <span className="w-12 h-px bg-[var(--color-accent)]" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-[var(--color-primary)] leading-[1.15] mb-6">
              <span className="italic text-[var(--color-accent)]">Earn Cashback</span>
              <br />
              <span className="font-medium">on Your Dream Home</span>
            </h1>

            <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mb-8" />

            <p className="font-sans text-sm sm:text-[15px] text-[var(--color-neutral-600)] max-w-xl mx-auto leading-relaxed">
              Purchase your new home through us and receive an exclusive cashback reward.
              The higher your investment, the greater your reward.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 sm:py-24 bg-[var(--color-secondary)]">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Calculator */}
            <div className="order-2 lg:order-1">
              <div className="luxury-card p-8 sm:p-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[var(--color-neutral-200)]">
                  <div className="w-11 h-11 bg-[var(--color-secondary-200)] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0">
                    <CalculatorIcon className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[var(--color-primary)]">Cashback Calculator</h3>
                    <p className="font-sans text-xs text-[var(--color-neutral-500)] mt-0.5">Adjust the slider to see your reward</p>
                  </div>
                </div>

                {/* Slider Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-[var(--color-neutral-500)] uppercase tracking-wider">Purchase Price</span>
                    <span className="font-sans text-xl font-semibold text-[var(--color-primary)]">₹{formatINR(purchasePrice)}</span>
                  </div>

                  {/* Custom Slider */}
                  <div className="relative h-2 bg-[var(--color-neutral-200)] rounded-full ">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] rounded-full transition-all duration-150"
                      style={{ width: `${rangePercent}%` }}
                    />
                    <input
                      aria-label="Purchase price"
                      type="range"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      min={MIN_PURCHASE_PRICE}
                      max={MAX_PURCHASE_PRICE}
                      step={100_000}
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    />
                    {/* Thumb indicator */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[var(--color-accent)] rounded-full shadow-md pointer-events-none transition-all duration-150"
                      style={{ left: `calc(${rangePercent}% - 10px)` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-[var(--color-neutral-400)] font-sans">
                    <span>₹50 Lakhs</span>
                    <span>₹5 Crores</span>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="mt-8 pt-6 border-t border-[var(--color-neutral-200)]">
                  <p className="font-sans text-xs text-[var(--color-neutral-500)] uppercase tracking-wider mb-3">Quick Select</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '₹75L', value: 7500000 },
                      { label: '₹1Cr', value: 10000000 },
                      { label: '₹1.5Cr', value: 15000000 },
                      { label: '₹2Cr', value: 20000000 },
                      { label: '₹3Cr', value: 30000000 },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPurchasePrice(option.value)}
                        className={`px-3 py-1.5 text-xs font-sans rounded-sm border transition-all duration-200 ${
                          purchasePrice === option.value
                            ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                            : 'bg-white text-[var(--color-neutral-600)] border-[var(--color-neutral-200)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Result Card */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="luxury-card overflow-hidden">
                  <div className="bg-[var(--color-secondary-200)] px-8 py-5 border-b border-[var(--color-neutral-200)]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white border border-[var(--color-neutral-200)] rounded-[var(--radius-sm)] flex items-center justify-center">
                        <HomeIcon className="w-5 h-5 text-[var(--color-accent)]" />
                      </div>
                      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--color-neutral-500)] font-medium">
                        Your Estimate
                      </span>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center gap-4">
                      <span className="font-sans text-sm text-[var(--color-neutral-600)]">Purchase Price</span>
                      <span className="font-serif text-xl text-[var(--color-primary)]">₹{formatINR(purchasePrice)}</span>
                    </div>

                    <div className="h-px bg-[var(--color-neutral-200)]" />

                    <div className="bg-[var(--color-secondary-200)] rounded-[var(--radius-md)] border border-[var(--color-neutral-200)] p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="font-sans text-sm text-[var(--color-neutral-600)]">Your Cashback</span>
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)]">
                          Instant
                        </span>
                      </div>
                      <div className="font-serif text-4xl sm:text-[2.75rem] text-[var(--color-accent)] font-medium tracking-tight">
                        ₹{formatINR(cashback)}
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-4 bg-[var(--color-secondary)] border-t border-[var(--color-neutral-200)]">
                    <p className="font-sans text-xs text-[var(--color-neutral-500)] text-center">
                      Final amount calculated at closing
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/listings?cashbackEligible=1')}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="luxury-button luxury-button-primary w-full py-4 text-sm font-semibold tracking-[0.08em]"
                >
                  <span>Unlock ₹{formatINR(cashback)} Cashback</span>
                  <ArrowRightIcon className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </button>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <SparklesIcon className="w-4 h-4 text-[var(--color-accent)]" />
                  <span className="font-sans text-xs text-[var(--color-neutral-500)]">Trusted by 500+ homeowners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-[var(--color-secondary-200)]">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3 font-medium">
              Why Choose Us
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-primary)]">
              Premium Benefits
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ReceiptPercentIcon,
                title: 'Instant Cashback',
                description: 'Receive your cashback directly at the time of property closing.',
              },
              {
                icon: CheckBadgeIcon,
                title: 'Verified Properties',
                description: 'All our listings are thoroughly verified for legal compliance and quality.',
              },
              {
                icon: HomeIcon,
                title: 'Premium Selection',
                description: 'Access exclusive properties in the most sought-after locations.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-[var(--color-neutral-200)] p-8 shadow-[0_4px_30px_rgba(15,30,46,0.08)] hover:shadow-[0_8px_40px_rgba(15,30,46,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-sm flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <h3 className="font-serif text-lg text-[var(--color-primary)] mb-2">{benefit.title}</h3>
                <p className="font-sans text-sm text-[var(--color-neutral-500)] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3 font-medium">
              Simple Process
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-primary)]">
              How It Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Browse Properties', description: 'Explore our curated selection of premium properties' },
              { step: '02', title: 'Schedule Visit', description: 'Book a visit to your shortlisted properties' },
              { step: '03', title: 'Close Deal', description: 'Complete your purchase with our expert assistance' },
              { step: '04', title: 'Get Cashback', description: 'Receive your cashback instantly at closing' },
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-[var(--color-neutral-200)]" />
                )}
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--color-accent)] text-white font-serif text-lg rounded-sm flex items-center justify-center mx-auto mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h4 className="font-serif text-base text-[var(--color-primary)] mb-2">{item.title}</h4>
                  <p className="font-sans text-sm text-[var(--color-neutral-500)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — light luxury, aligned with Home journey block */}
      <section className="py-16 sm:py-20 bg-[var(--color-secondary-200)] border-t border-[var(--color-neutral-200)]">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4 font-medium">
              Ready to Start?
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.75rem] text-[var(--color-primary)] mb-6 leading-tight">
              Find Your Dream Home Today
            </h2>
            <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mb-8" />
            <p className="font-sans text-sm text-[var(--color-neutral-600)] mb-10 max-w-md mx-auto leading-relaxed">
              Browse our collection of premium properties and unlock exclusive cashback rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => navigate('/listings')}
                className="luxury-button luxury-button-primary"
              >
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
    </div>
  )
}