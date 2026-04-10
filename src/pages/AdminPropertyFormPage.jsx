import { Link, useParams } from 'react-router-dom'
import { PropertyForm } from '../components/admin/PropertyForm'

export function AdminPropertyFormPage() {
  const { propertyId } = useParams()
  const isEdit = Boolean(propertyId)

  return (
    <div className="space-y-6 bg-[#f4f2ed] p-4 sm:p-6 md:p-8 md:rounded-2xl">
      <div className="flex flex-col gap-2">
        <Link
          to="/admin/properties"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline"
        >
          <span aria-hidden="true">←</span> Back to properties
        </Link>
        <header className="space-y-1 pt-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEdit ? 'Edit property' : 'Create property'}
          </h1>
          <p className="text-[15px] text-slate-600">
            {isEdit
              ? 'Update listing details, then save. Images and floor plans you add are appended to existing files.'
              : 'Fill in the listing. Title, price, location, and at least one image are required.'}
          </p>
        </header>
      </div>

      <PropertyForm key={propertyId ?? 'new'} />
    </div>
  )
}
