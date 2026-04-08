'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'

type ConsentType = {
  necessary: boolean
  analytics: boolean
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [consent, setConsent] = useState<ConsentType | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    setMounted(true)

    const saved = localStorage.getItem('cookieConsent')

    if (saved) {
      const parsed = JSON.parse(saved)
      setConsent(parsed)

      // 👉 Consent Mode vorbereiten
      if (parsed.analytics) {
        window.gtag?.('consent', 'update', {
          analytics_storage: 'granted'
        })
      }
    } else {
      setVisible(true)
    }
  }, [])

  const saveConsent = (data: ConsentType) => {
    localStorage.setItem('cookieConsent', JSON.stringify(data))
    setConsent(data)
    setVisible(false)
    setShowSettings(false)

    // 👉 Google Consent Mode vorbereiten
    if (data.analytics) {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      })
    } else {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true })
  }

  const declineAll = () => {
    saveConsent({ necessary: true, analytics: false })
  }

  const openSettings = () => {
    setVisible(true)
    setShowSettings(true)
  }

  if (!mounted) return null

  return (
    <>
      {/* 🍪 BANNER */}
      {visible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl p-5">

            {!showSettings ? (
              <>
                <p className="text-sm text-gray-700 mb-4 text-center sm:text-left">
                  🍪 Wir verwenden Cookies, um unsere Website zu verbessern.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 justify-end">
                  <button
                    onClick={declineAll}
                    className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
                  >
                    Ablehnen
                  </button>

                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
                  >
                    Einstellungen
                  </button>

                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 rounded-lg text-sm bg-green-600 text-white"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold mb-4">Cookie Einstellungen</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Notwendige Cookies</span>
                    <span className="text-green-600 font-medium">Immer aktiv</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Statistik (Google Analytics)</span>
                    <input
                      type="checkbox"
                      checked={consent?.analytics ?? false}
                      onChange={(e) =>
                        setConsent({
                          necessary: true,
                          analytics: e.target.checked
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-100 rounded-lg"
                  >
                    Zurück
                  </button>

                  <button
                    onClick={() =>
                      saveConsent(consent || { necessary: true, analytics: false })
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Speichern
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* ⚙️ BUTTON */}
      {consent && !visible && (
        <motion.button
          onClick={openSettings}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 left-6 z-50 bg-white px-4 py-3 rounded-full shadow-xl border"
        >
          <Settings size={18} />
        </motion.button>
      )}
    </>
  )
}
