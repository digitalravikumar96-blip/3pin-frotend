export function WhatsAppButton({
  phone,
  message = '',
  className = '',
  floating = true,
  propertyHref = '/listings',
}) {
  const normalizedPhone = String(phone || '').replace(/[^\d+]/g, '')
  const encodedMessage = encodeURIComponent(message)
  const whatsappHref = `https://wa.me/${normalizedPhone.replace('+', '')}${message ? `?text=${encodedMessage}` : ''}`
  const callHref = `tel:${normalizedPhone}`
  const handleCallNow = () => {
    // Trigger phone dialer with the number prefilled (best support on mobile browsers).
    window.location.href = callHref
  }

  const position = floating ? 'fixed bottom-5 right-5 z-50' : 'relative w-full justify-center'
  const wrapper = [position, className].filter(Boolean).join(' ')
  const iconButtonBase =
    'group inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  return (
    <div className={wrapper} aria-label="Quick actions">
      <div className="flex flex-col items-end gap-3">
        <a
          href={callHref}
          onClick={handleCallNow}
          className={`${iconButtonBase} bg-[#0ea5e9] ring-[#0284c7]/35 focus-visible:ring-[#0284c7]`}
          aria-label="Call now"
        >
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.384 12.037 12.037 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .384-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L7.213 3.102A1.125 1.125 0 0 0 6.122 2.25H4.75A2.25 2.25 0 0 0 2.5 4.5v2.25Z" />
          </svg>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`${iconButtonBase} bg-[#25D366] ring-[#128C7E]/35 focus-visible:ring-[#128C7E]`}
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="currentColor">
            <path d="M19.06 4.94A9.88 9.88 0 0 0 12.01 2C6.48 2 2 6.47 2 11.99c0 1.77.46 3.49 1.34 5L2 22l5.15-1.34a10 10 0 0 0 4.85 1.24h.01c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.95-6.96Zm-7.05 15.3h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.06.8.82-2.98-.2-.31a8.3 8.3 0 0 1-1.28-4.42c0-4.59 3.73-8.31 8.32-8.31 2.21 0 4.28.86 5.84 2.43a8.23 8.23 0 0 1 2.42 5.88c0 4.58-3.73 8.3-8.32 8.3Zm4.56-6.24c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.56.13-.17.24-.65.8-.8.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2.01-1.23-.74-.67-1.24-1.49-1.39-1.74-.14-.24-.01-.37.11-.5.12-.12.25-.3.37-.45.12-.14.16-.24.24-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.24-.88.86-.88 2.1 0 1.24.9 2.44 1.02 2.61.13.17 1.76 2.68 4.26 3.76.59.26 1.06.42 1.42.54.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.05-.1-.22-.16-.47-.28Z" />
          </svg>
        </a>

        <a
          href={propertyHref}
          className={`${iconButtonBase} bg-[#f59e0b] ring-[#d97706]/30 focus-visible:ring-[#d97706]`}
          aria-label="View properties"
        >
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M5.25 21V8.625c0-.31.15-.6.403-.78l6-4.364a.75.75 0 0 1 .894 0l6 4.364c.253.18.403.47.403.78V21M9 21v-5.25c0-.414.336-.75.75-.75h4.5c.414 0 .75.336.75.75V21" />
          </svg>
        </a>
      </div>
    </div>
  )
}
