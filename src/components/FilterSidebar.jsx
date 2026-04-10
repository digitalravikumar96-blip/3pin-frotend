import { useMemo } from 'react'

const TYPES = ['Apartment', 'Terrace', 'Detached', 'Semi-Detached', 'Duplex', 'Condo', 'Bungalow', 'Studio']

export function FilterSidebar({ filters, onChange }) {
  const next = useMemo(
    () => ({
      location: filters?.location || '',
      budget: Number.isFinite(filters?.budget) ? filters.budget : 0,
      type: filters?.type || '',
    }),
    [filters],
  )

  function update(patch) {
    onChange?.({ ...next, ...patch })
  }

  return (
    <div className="space-y-5">
      {/* Location Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">Location</label>
        <input
          value={next.location}
          onChange={(e) => update({ location: e.target.value })}
          placeholder="e.g. Ikoyi, Lekki"
          className="w-full rounded-sm border border-[var(--color-neutral-200)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(198,168,75,0.15)] transition-all"
        />
      </div>

      {/* Budget Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">Budget (max)</label>
        <input
          type="number"
          min={0}
          value={next.budget || ''}
          onChange={(e) => update({ budget: e.target.value ? Number(e.target.value) : 0 })}
          placeholder="e.g. 300000000"
          className="w-full rounded-sm border border-[var(--color-neutral-200)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-neutral-400)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(198,168,75,0.15)] transition-all"
        />
        <p className="text-[11px] text-[var(--color-neutral-500)]">Enter maximum price in INR.</p>
      </div>

      {/* Property Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">Property type</label>
        <select
          value={next.type}
          onChange={(e) => update({ type: e.target.value })}
          className="w-full rounded-sm border border-[var(--color-neutral-200)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(198,168,75,0.15)] transition-all appearance-none cursor-pointer"
        >
          <option value="">Any</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}