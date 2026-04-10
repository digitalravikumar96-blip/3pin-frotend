import { useMemo, useState } from 'react'

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
        form.email.trim() &&
        form.phone.trim() &&
        form.message.trim() &&
        (!showDateTime || (form.date && form.time))
      ) && status !== 'loading',
    [form, status, showDateTime]
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
          placeholder="Full name"
          className="luxury-input text-sm"
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
          placeholder="Phone number"
          type="tel"
          className="luxury-input text-sm"
          required
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          placeholder="Your message"
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
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
              className="luxury-input text-sm"
            />
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
