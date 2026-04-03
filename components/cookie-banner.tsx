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
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm">
        Wir verwenden Cookies, um die Website zu verbessern.
      </p>

      <div className="flex gap-2">
        <button
          onClick={decline}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          Ablehnen
        </button>

        <button
          onClick={accept}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  )
}
