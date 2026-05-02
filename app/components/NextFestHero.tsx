'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Fest = {
  _id: string
  name: string
  description?: string
  date?: string
  startDate?: string
  endDate?: string
  images?: string[]
  highlights?: any[]
}

/* ---------------- HELPERS ---------------- */

function toDateSafe(input?: string | null): Date | null {
  if (!input) return null

  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return new Date(input + 'T00:00:00')
  }

  return new Date(input)
}

function getTimeLeft(targetDate?: string | null) {
  const target = toDateSafe(targetDate)

  if (!target) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const total = Math.max(target.getTime() - new Date().getTime(), 0)

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60)
  }
}

function getFestRange(fest: Fest) {
  if (fest.startDate && fest.endDate) {
    return {
      start: new Date(fest.startDate),
      end: new Date(fest.endDate)
    }
  }

  const base = toDateSafe(fest.date)
  if (!base) {
    const now = new Date()
    return { start: now, end: now }
  }

  const start = new Date(base)
  start.setHours(0, 0, 0, 0)

  const end = new Date(base)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getFestStatus(fest: Fest) {
  const now = new Date()
  const { start, end } = getFestRange(fest)

  // 👉 ganzer Tag zählt als "live"
  if (isSameDay(now, start)) return 'live'

  if (now >= start && now <= end) return 'live'
  if (now < start) return 'upcoming'
  return 'past'
}

/* ---------------- COMPONENT ---------------- */

export default function NextFestHero({ feste }: { feste: Fest[] }) {
  if (!Array.isArray(feste) || feste.length === 0) return null

  const now = new Date()

  const festeSorted = [...feste].sort(
    (a, b) => getFestRange(a).start.getTime() - getFestRange(b).start.getTime()
  )

  // 👉 aktuelles Fest (inkl. "heute")
  const currentFest = festeSorted.find(
    (fest) => getFestStatus(fest) === 'live'
  )

  // 👉 nächstes Fest
  const upcomingFest = festeSorted.find(
    (fest) => getFestRange(fest).start > now
  )

  const nextFest = currentFest || upcomingFest

  if (!nextFest) return null

  const targetDate = nextFest.startDate || nextFest.date || null

  const [time, setTime] = useState(getTimeLeft(targetDate))
  const festStatus = getFestStatus(nextFest)

  useEffect(() => {
    if (!targetDate) return

    const interval = setInterval(() => {
      setTime(getTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const image =
    Array.isArray(nextFest.images) && nextFest.images.length > 0
      ? nextFest.images[0]
      : null

  let button: { text: string; url: string } | null = null

  if (Array.isArray(nextFest.highlights)) {
    const firstLink = nextFest.highlights.find(
      (item: any) => typeof item === 'object' && item?.url
    )

    if (firstLink) {
      button = {
        text: firstLink.text || 'Mehr erfahren',
        url: firstLink.url
      }
    }
  }

  return (
    <section className="relative z-20 -mt-15 md:-mt-18 px-4">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/10 min-h-[320px] md:min-h-[380px]"
        >

          {image && (
            <Image
              src={image}
              alt={nextFest.name}
              fill
              className="object-cover object-top scale-105"
              priority
            />
          )}

          {/* 🔥 HELLERES OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="relative p-5 md:p-10 text-white max-w-xl">

            <p className="text-green-400 uppercase tracking-widest text-xs mb-2">
              Nächstes Fest
            </p>

            <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              {nextFest.name}
            </h2>

            {/* STATUS */}
            {festStatus === 'live' ? (
              <div className="text-lg font-semibold text-green-400 drop-shadow">
                🎉 Heute ist das Fest!
              </div>
            ) : festStatus === 'upcoming' && time.total > 0 ? (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[
                  { label: 'Tage', value: time.days },
                  { label: 'Std', value: time.hours },
                  { label: 'Min', value: time.minutes },
                  { label: 'Sek', value: time.seconds }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-black/30 backdrop-blur-md rounded-xl p-3 text-center border border-white/10"
                  >
                    <div className="text-2xl font-bold drop-shadow">
                      {item.value}
                    </div>
                    <div className="text-xs text-white/80">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-white/70">
                Dieses Fest hat bereits stattgefunden
              </div>
            )}

            {button && (
              <a
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-md transition"
              >
                {button.text} →
              </a>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  )
}
