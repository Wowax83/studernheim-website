'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setVisible(false)
  }

  if (!mounted || !visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Text */}
        <p className="text-sm text-gray-700 text-center sm:text-left leading-relaxed">
          🍪 Wir verwenden Cookies, um deine Erfahrung zu verbessern.
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Ablehnen
          </button>

          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg text-sm bg-green-600 hover:bg-green-700 text-white shadow-md transition"
          >
            Akzeptieren
          </button>
        </div>

      </div>
    </div>
  )
}
