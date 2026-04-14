'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ortsverwaltungData } from '@/lib/data'

/* ---------------- HELPERS ---------------- */

function getNthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number) {
  const firstDay = new Date(year, month, 1)
  const firstWeekday = firstDay.getDay()
  const offset = (weekday - firstWeekday + 7) % 7
  const day = 1 + offset + (nth - 1) * 7
  return new Date(year, month, day)
}

function getSprechstundenForMonth(year: number, month: number) {
  const firstThu = getNthWeekdayOfMonth(year, month, 4, 1)
  const thirdThu = getNthWeekdayOfMonth(year, month, 4, 3)

  return [
    {
      date: firstThu,
      start: 17,
      end: 18,
      label: '17:00 - 18:00 Uhr'
    },
    {
      date: thirdThu,
      start: 20,
      end: 21,
      label: '20:00 - 21:00 Uhr'
    }
  ]
}

function getNextSprechstunde() {
  const now = new Date()
  const candidates: any[] = []

  for (let i = 0; i < 3; i++) {
    const base = new Date(now.getFullYear(), now.getMonth() + i, 1)
    const slots = getSprechstundenForMonth(base.getFullYear(), base.getMonth())

    slots.forEach(slot => {
      const fullDate = new Date(slot.date)
      fullDate.setHours(slot.start, 0, 0)

      candidates.push({
        ...slot,
        fullDate
      })
    })
  }

  return candidates
    .filter(c => c.fullDate >= now)
    .sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime())[0]
}

function isNowOpen() {
  const now = new Date()
  const slots = getSprechstundenForMonth(now.getFullYear(), now.getMonth())

  return slots.some(slot => {
    const start = new Date(slot.date)
    start.setHours(slot.start, 0, 0)

    const end = new Date(slot.date)
    end.setHours(slot.end, 0, 0)

    return now >= start && now <= end
  })
}

/* ---------------- COMPONENT ---------------- */

export default function Ortsverwaltung() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15
  })

  const next = getNextSprechstunde()

  const [openNow, setOpenNow] = useState(isNowOpen())

  useEffect(() => {
    const interval = setInterval(() => {
      setOpenNow(isNowOpen())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section
      id="ortsverwaltung"
      className="py-20 sm:py-28 bg-gradient-to-b from-white to-green-50/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-green-100/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Ortsverwaltung</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ihre Ansprechpartner für alle Anliegen rund um unser Dorf.
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <motion.div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-green-700 to-emerald-600 text-white">
            <div className="relative p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">

              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src="/images/thomas-batke.png"
                  alt="Thomas Batke"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold">Thomas Batke</h3>
                <p className="text-white/80">Ortsvorsteher</p>

                {/* STATUS */}
                <div className="mt-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    openNow
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {openNow ? 'Jetzt geöffnet' : 'Geschlossen'}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CONTACT */}
          <motion.div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin className="text-green-600" size={26} />
              Kontakt
            </h3>

            <div className="space-y-5 text-gray-700">

              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Adresse</p>
                  <p>Frankenthaler Straße 4</p>
                  <p>67227 Frankenthal - Studernheim</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Telefon</p>
                  <a href="tel:0623342334" className="text-green-600 hover:text-green-800">
                    06233 42334
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={20} className="text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">E-Mail</p>
                  <a href="mailto:ortsvorsteher.studernheim@gmail.com" className="text-green-600 hover:text-green-800">
                    ortsvorsteher.studernheim@gmail.com
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* OPENING */}
          <motion.div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Clock className="text-green-600" size={26} />
              Öffnungszeiten
            </h3>

            {ortsverwaltungData.openingHours.map((s, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-900">{s.day}</span>
                <span className="text-gray-600">{s.hours}</span>
              </div>
            ))}

            {next && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-700 font-medium mb-1">
                  Nächste Sprechstunde
                </p>
                <p className="text-gray-900 font-semibold">
                  {next.fullDate.toLocaleDateString('de-DE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
                <p className="text-green-700">{next.label}</p>
              </div>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  )
}
