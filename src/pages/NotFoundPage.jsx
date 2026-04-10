import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-lg font-extrabold tracking-tight text-slate-900">Page not found</div>
      <p className="mt-1 text-sm text-slate-600">The page you’re looking for doesn’t exist.</p>
      <div className="mt-4 flex gap-3">
        <Link
          to="/"
          className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-slate-800"
        >
          Go home
        </Link>
        <Link
          to="/listings"
          className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Browse listings
        </Link>
      </div>
    </div>
  )
}

