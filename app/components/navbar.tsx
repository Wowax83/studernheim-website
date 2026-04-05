'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const navigation = [
  { name: 'SAG', href: '/#sag' },
  { name: 'Feste', href: '/#feste' },
  { name: 'Vereine', href: '/#vereine' },
  { name: 'Termine', href: '/#termine' },
  { name: 'Ortsverwaltung', href: '/#ortsverwaltung' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Nur auf Startseite Sections checken
      if (window.location.pathname !== '/') return

      const sections = navigation.map(item => item.href.split('#')[1])

      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    setIsMobileMenuOpen(false)

    // Wenn nicht auf Startseite → normal navigieren
    if (window.location.pathname !== '/') return

    // Smooth scroll nur auf Startseite
    const id = href.split('#')[1]
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-2xl font-bold gradient-text hover:scale-105 transition-transform"
            >
              Studernheim
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleClick(item.href)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                    activeSection === item.href.split('#')[1]
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/#kontakt"
                onClick={() => handleClick('/#kontakt')}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Kontakt
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleClick(item.href)}
                  className={cn(
                    'block w-full text-left px-4 py-3 rounded-lg font-medium transition-all',
                    activeSection === item.href.split('#')[1]
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/#kontakt"
                onClick={() => handleClick('/#kontakt')}
                className="block w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Kontakt
              </Link>

              {/* Zusatz Links */}
              <Link href="/impressum" className="block px-4 py-2 text-sm text-gray-500">
                Impressum
              </Link>
              <Link href="/datenschutz" className="block px-4 py-2 text-sm text-gray-500">
                Datenschutz
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Mobile CTA */}
      <Link
        href="/#kontakt"
        onClick={() => handleClick('/#kontakt')}
        className="md:hidden fixed bottom-6 right-6 z-40 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium shadow-2xl hover:scale-110 transition-transform"
      >
        Kontakt
      </Link>
    </>
  )
}
