'use client'

import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [total, setTotal] = useState(0)
  const [today, setToday] = useState(0)

  const [displayTotal, setDisplayTotal] = useState(0)
  const [displayToday, setDisplayToday] = useState(0)

  useEffect(() => {
    fetch('/api/visits')
      .then(res => res.json())
      .then(data => {
        setTotal(data.total || 0)
        setToday(data.today || 0)
      })
      .catch(() => {
        setTotal(0)
        setToday(0)
      })
  }, [])

  // 🔥 leichte Animation
  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      i++

      setDisplayTotal(prev =>
        prev < total ? Math.min(prev + Math.ceil(total / 20), total) : total
      )

      setDisplayToday(prev =>
        prev < today ? Math.min(prev + 1, today) : today
      )

      if (i > 20) clearInterval(interval)
    }, 30)

    return () => clearInterval(interval)
  }, [total, today])

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Branding */}
          <div>
            <h3 className="font-heading text-2xl font-bold gradient-text mb-4">
              Studernheim
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Ein Dorf voller Leben, Tradition und Gemeinschaft in der schönen Pfalz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Schnellzugriff</h4>
            <ul className="space-y-2">
              {['SAG', 'Feste', 'Vereine', 'Ortsverwaltung'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase())
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Alexander Hüter</li>
              <li>Oggersheimer Str. 14</li>
              <li>67227 Frankenthal (Pfalz)</li>
              <li>
                <a
                  href="mailto:studernheim.ag@gmail.com"
                  className="hover:text-green-400 transition-colors"
                >
                  studernheim.ag@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <a href="/impressum" className="text-gray-400 hover:text-green-400 transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz" className="text-gray-400 hover:text-green-400 transition-colors">
                  Datenschutz
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Image Credits */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <p className="text-xs text-gray-500 text-center mb-2">
            Bildnachweis: Alle Bilder von Unsplash und Pexels
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Left */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-400 text-sm">
            <span>
              © {new Date().getFullYear()} Studernheim. Alle Rechte vorbehalten.
            </span>

            <span className="text-green-400 font-semibold">
              • Heute: {displayToday} • Gesamt: {displayTotal}
            </span>
          </div>

          {/* Right */}
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            Gemacht mit <Heart size={16} className="text-red-500" /> für unser Dorf
          </p>

        </div>
      </div>
    </footer>
  )
}
