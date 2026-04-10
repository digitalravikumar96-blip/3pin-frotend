import { Navigate, Outlet } from 'react-router-dom'

const ADMIN_STORAGE_KEY = 'adminAuthed'

export function AdminLayout() {
  const isAuthed =
    typeof window !== 'undefined' && window.localStorage.getItem(ADMIN_STORAGE_KEY) === '1'

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="mx-auto w-full px-4 py-6 sm:px-6 md:py-8">
      <Outlet />
    </div>
  )
}
