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

      if (window.location.pathname !== '/') return

      const sections = navigation.map(item => item.href.split('#')[1])

      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })

      if (current) {
        setActiveSection(current)
      } else {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)

    if (window.location.pathname !== '/') return

    const id = href.split('#')[1]
    const element = document.getElementById(id)

    if (element) {
      const yOffset = -80
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glass backdrop-blur-xl shadow-xl'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'flex justify-between items-center transition-all duration-300',
              isScrolled ? 'h-14' : 'h-16'
            )}
          >

            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-2xl font-bold gradient-text hover:scale-110 transition-all duration-300"
            >
              Studernheim
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'nav-item nav-glow',
                    activeSection === item.href.split('#')[1]
                      ? 'text-green-600 bg-white/60 shadow-sm'
                      : 'text-gray-700 hover:text-green-600'
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/#kontakt"
                onClick={() => scrollToSection('/#kontakt')}
                className="ml-3 px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-all"
              >
                Kontakt
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass backdrop-blur-xl border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-white/50 transition"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/#kontakt"
                onClick={() => scrollToSection('/#kontakt')}
                className="block px-4 py-3 bg-green-600 text-white rounded-lg text-center font-medium"
              >
                Kontakt
              </Link>

              <div className="pt-2 border-t border-gray-200">
                <Link href="/impressum" className="block px-4 py-2 text-sm text-gray-500">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="block px-4 py-2 text-sm text-gray-500">
                  Datenschutz
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Mobile CTA */}
      <Link
        href="/#kontakt"
        onClick={() => scrollToSection('/#kontakt')}
        className="md:hidden fixed bottom-6 right-6 z-40 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium shadow-2xl hover:scale-110 transition-transform"
      >
        Kontakt
      </Link>
    </>
  )
}
