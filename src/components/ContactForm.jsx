import { useMemo, useState } from 'react'

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
]

export function ContactForm({
  title = 'Contact agent',
  subtitle = 'We\'ll respond shortly.',
  onSubmit,
  showDateTime = false,
  compact = false,
}) {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', date: '', time: '' })

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.name.trim() &&
        form.phone.trim() 
        // (!showDateTime || (form.date && form.time))
      ) && status !== 'loading',
    [form, status]
  )

  async function submit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('loading')
    try {
      await onSubmit?.(form)
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-3">
        <input
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Full name *"
          className="luxury-input text-sm"
          required
        />
        <input
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          placeholder="Email address"
          type="email"
          className="luxury-input text-sm"
        />
        <input
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          placeholder="Phone number *"
          type="tel"
          className="luxury-input text-sm"
          required
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          placeholder="Your message (optional)"
          rows={compact ? 3 : 4}
          className="luxury-input resize-none text-sm"
        />
        {showDateTime ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
              className="luxury-input text-sm"
            />
            <select
              value={form.time}
              onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
              className="luxury-input text-sm"
            >
              <option value="">Select time</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="luxury-button luxury-button-primary w-full text-xs disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </span>
        ) : status === 'success' ? (
          'Message Sent'
        ) : status === 'error' ? (
          'Try Again'
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
