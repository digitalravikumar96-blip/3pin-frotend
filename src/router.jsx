import { createBrowserRouter, Navigate } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { HomePage } from './pages/HomePage'
import { ListingsPage } from './pages/ListingsPage'
import { PropertyPage } from './pages/PropertyPage'
import { SellPage } from './pages/SellPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminPropertyListPage } from './pages/AdminPropertyListPage'
import { AdminPropertyFormPage } from './pages/AdminPropertyFormPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { ContactPage } from './pages/ContactPage'
import { CashbackCalculatorPage } from './pages/CashbackCalculatorPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/listings', element: <ListingsPage /> },
      { path: '/property/:id', element: <PropertyPage /> },
      { path: '/sell', element: <SellPage /> },
      { path: '/admin/login', element: <AdminLoginPage /> },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="properties" replace /> },
          { path: 'properties', element: <AdminPropertyListPage /> },
          { path: 'properties/new', element: <AdminPropertyFormPage /> },
          { path: 'properties/:propertyId/edit', element: <AdminPropertyFormPage /> },
        ],
      },
      { path: '/articles', element: <ArticlesPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/cashback', element: <CashbackCalculatorPage /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
