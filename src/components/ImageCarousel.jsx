import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'

export function ImageCarousel({ images = [], alt = 'Property image', cashbackEligible = false }) {
  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images])
  const [index, setIndex] = useState(0)

  const hasImages = safeImages.length > 0
  const current = safeImages[index] || safeImages[0]

  function prev() {
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length)
  }

  function next() {
    setIndex((i) => (i + 1) % safeImages.length)
  }

  if (!hasImages) {
    return (
      <div className="aspect-[16/10] w-full bg-[var(--color-secondary)] border border-[var(--color-neutral-200)]" />
    )
  }

  return (
    <div className="relative overflow-hidden bg-[var(--color-secondary)] border border-[var(--color-neutral-200)]">
      <div className="relative aspect-[16/10]">
        <img
          src={current}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cashback Badge - Top Left */}
        {cashbackEligible && (
          <div className="absolute top-4 left-4 bg-[#2d7a4f]/95 px-3 py-1.5 rounded-md shadow-md">
            <span className="font-sans text-xs font-medium text-white">Eligible for Cashback</span>
          </div>
        )}

        {safeImages.length > 1 ? (
          <>
            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center text-[var(--color-primary)] hover:bg-white transition shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center text-[var(--color-primary)] hover:bg-white transition shadow-lg"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {safeImages.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={[
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index ? 'w-6 bg-[var(--color-accent)]' : 'w-1.5 bg-white/60 hover:bg-white',
                  ].join(' ')}
                />
              ))}
            </div>

            {/* Image Counter - Top Right */}
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 font-sans text-xs text-[var(--color-primary)]">
              {index + 1} / {safeImages.length}
            </div>
          </>
        ) : null}
      </div>

      {/* Thumbnail Strip */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 p-2 bg-white border-t border-[var(--color-neutral-200)]">
          {safeImages.slice(0, 5).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className={[
                'relative w-16 h-12 flex-shrink-0 overflow-hidden transition',
                i === index ? 'ring-2 ring-[var(--color-accent)]' : 'opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
