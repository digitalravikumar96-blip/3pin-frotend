import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid'

export function WhatsAppButton({ phone, message = '', className = '', floating = true }) {
  const normalizedPhone = String(phone || '').replace(/[^\d+]/g, '')
  const encodedMessage = encodeURIComponent(message)
  const href = `https://wa.me/${normalizedPhone.replace('+', '')}${message ? `?text=${encodedMessage}` : ''}`

  const base =
    'group inline-flex items-center gap-3 rounded-lg bg-[#25D366] px-4 py-3 text-white shadow-[var(--shadow-md)] ring-1 ring-[#128C7E]/25 transition hover:bg-[#20BD5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'

  const position = floating ? 'fixed bottom-5 right-5 z-50' : 'relative w-full justify-center'

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[base, position, className].filter(Boolean).join(' ')}
      aria-label="Chat on WhatsApp"
    >
      <span className="grid size-10 place-items-center rounded-full bg-white/15">
        <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
      </span>
      <span className={`text-sm font-semibold ${floating ? 'hidden pr-1 sm:inline' : 'pr-1'}`}>WhatsApp</span>
      <span className="sr-only">Open WhatsApp chat</span>
    </a>
  )
}
