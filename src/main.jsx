import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster 
      toastOptions={{
        duration: 3000,
        style: {
          background: 'var(--color-bg-surface)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          fontFamily: "'Urbanist', sans-serif",
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-live)',
            secondary: 'var(--color-text-primary)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: 'var(--color-text-primary)',
          },
        },
      }} 
    />
  </React.StrictMode>,
)
