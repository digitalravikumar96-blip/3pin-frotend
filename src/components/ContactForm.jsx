import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

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

  const today = new Date().toISOString().split("T")[0];

const filteredTimeSlots = useMemo(() => {
  if (!form.date) return TIME_SLOTS;

  // If not today → allow all
  if (form.date !== today) return TIME_SLOTS;

  const now = new Date();

  return TIME_SLOTS.filter((slot) => {
    const [time, modifier] = slot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const slotDate = new Date();
    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate > now;
  });
}, [form.date]);

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

    const promise = onSubmit
      ? onSubmit(form)
      : new Promise((res) => setTimeout(res, 1000))

      promise
      .then(() => {
        toast.success('Message sent successfully')
      })
      .catch(() => {
        toast.error('Failed to send message')
      })

    try {
      await promise
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '', date: '', time: '' })
    } catch (err) {
      console.error(err)
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
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
              className="luxury-input text-sm"
            />
            <select
              value={form.time}
              onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
              className="luxury-input text-sm"
            >
              <option value="">Select time</option>
              {filteredTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
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
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
