import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from './router'

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#111',
            color: '#fff',
            fontSize: '14px',
            padding: '12px 16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          },
        }}
      />
    </>
  )
}
