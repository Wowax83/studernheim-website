'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted')
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm">
        Diese Website verwendet Cookies für die grundlegende Funktionalität.
      </p>
      <button
        onClick={accept}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        OK
      </button>
    </div>
  )
}
