import { useMemo, useState } from 'react'
import '../styles/sell.css'

export function SellPage() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.name.trim() &&
        form.email.trim() &&
        form.phone.trim() &&
        form.message.trim()
      ) && status !== 'loading',
    [form, status]
  )

  async function submit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('loading')
    try {
      await new Promise((r) => setTimeout(r, 700)) // Simulate submission
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  return (
    <div className="sell-section">
      <div className="sell-section__container">
        {/* Left Column - Sell Info */}
        <div className="sell-section__left">
          <div className="sell-section__header">
            <h1 className="sell-section__title">Sell Your Property</h1>
            <p className="sell-section__subtitle">
              Maximize your property's value with our expert marketing and negotiation services
            </p>
          </div>

          <div className="sell-section__info-card">
            {/* Professional Marketing */}
            <div className="sell-section__info-block">
              <div className="sell-section__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
              </div>
              <div>
                <h3 className="sell-section__info-label">Professional Marketing</h3>
                <p className="sell-section__info-text">High-quality photography, virtual tours, and strategic online exposure to attract qualified buyers</p>
              </div>
            </div>

            {/* Expert Negotiation */}
            <div className="sell-section__info-block">
              <div className="sell-section__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  <path d="M12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="sell-section__info-label">Expert Negotiation</h3>
                <p className="sell-section__info-text">Skilled negotiation to secure the best possible price and terms for your property</p>
              </div>
            </div>

            {/* Scheduled Viewings */}
            <div className="sell-section__info-block">
              <div className="sell-section__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div>
                <h3 className="sell-section__info-label">Scheduled Viewings</h3>
                <p className="sell-section__info-text">Coordinated property showings with pre-qualified buyers at convenient times</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sell Form */}
        <div className="sell-section__right">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="Full name"
                className="sell-section__input"
                required
              />
              <input
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="Email address"
                type="email"
                className="sell-section__input"
                required
              />
              <input
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                placeholder="Phone number"
                type="tel"
                className="sell-section__input"
                required
              />
              <textarea
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Property details (location, size, features, etc.)"
                rows={4}
                className="sell-section__input sell-section__textarea"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="sell-section__button"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : status === 'success' ? (
                'Valuation Requested'
              ) : status === 'error' ? (
                'Error - Try Again'
              ) : (
                'Get Free Property Valuation'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

