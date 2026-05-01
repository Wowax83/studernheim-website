'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* ---------------- TIME HELPERS ---------------- */

function getTimeLeft(targetDate: string) {
  const total = Math.max(
    new Date(targetDate).getTime() - new Date().getTime(),
    0
  )

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60)
  }
}

function getFestRange(fest: any) {
  // Wenn Start- und Endzeit existieren → nutzen
  if (fest.startDate && fest.endDate) {
    return {
      start: new Date(fest.startDate),
      end: new Date(fest.endDate)
    }
  }

  // Fallback: ganzer Tag
  const baseDate = new Date(fest.date)

  const start = new Date(baseDate)
  start.setHours(0, 0, 0, 0)

  const end = new Date(baseDate)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

function getFestStatus(fest: any) {
  const now = new Date()
  const { start, end } = getFestRange(fest)

  const afterglowEnd = new Date(end)
  afterglowEnd.setDate(afterglowEnd.getDate() + 2)

  if (now < start) return 'upcoming'
  if (now >= start && now <= end) return 'live'
  if (now > end && now <= afterglowEnd) return 'afterglow'
  return 'past'
}

/* ---------------- COMPONENT ---------------- */

export default function NextFestHero({ feste }: any) {
  if (!Array.isArray(feste) || feste.length === 0) return null

  const nextFest = feste[0]

  const [time, setTime] = useState(
    nextFest?.date ? getTimeLeft(nextFest.date) : null
  )

  const festStatus = nextFest ? getFestStatus(nextFest) : null

  useEffect(() => {
    if (!nextFest?.date) return

    const interval = setInterval(() => {
      setTime(getTimeLeft(nextFest.date))
    }, 1000)

    return () => clearInterval(interval)
  }, [nextFest])

  const image =
    Array.isArray(nextFest.images) && nextFest.images.length > 0
      ? nextFest.images[0]
      : null

  // Button aus Highlights
  let button = null
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
    <section className="relative z-20 -mt-20 md:-mt-32 px-4">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            relative rounded-2xl overflow-hidden
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            border border-white/10
            min-h-[320px] md:min-h-[380px]
          "
        >

          {/* Background */}
          {image && (
            <Image
              src={image}
              alt={nextFest.name}
              fill
              className="object-cover object-top scale-105"
              priority
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />

          {/* Content */}
          <div className="relative p-5 md:p-10 text-white max-w-xl">

            <p className="text-green-400 uppercase tracking-widest text-xs mb-2">
              Nächstes Fest
            </p>

            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              {nextFest.name}
            </h2>

            {nextFest.date && (
              <p className="text-white/80 mb-6 text-sm md:text-base">
                {new Date(nextFest.date).toLocaleDateString('de-DE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            )}

            {/* STATUS LOGIK */}
            {festStatus === 'live' ? (
              <div className="text-lg font-semibold text-green-400">
                🎉 Heute ist das Fest!
              </div>
            ) : festStatus === 'afterglow' ? (
              <div className="text-lg font-semibold text-green-300">
                🥳 Wir feiern noch :)
              </div>
            ) : festStatus === 'upcoming' && time && time.total > 0 ? (
              <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-md mt-4">
                {[
                  { label: 'Tage', value: time.days },
                  { label: 'Std', value: time.hours },
                  { label: 'Min', value: time.minutes },
                  { label: 'Sek', value: time.seconds }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-xl p-2 md:p-3 text-center"
                  >
                    <div className="text-xl md:text-3xl font-extrabold drop-shadow-lg">
                      {item.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/80">
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

            {/* Button */}
            {button && (
              <a
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6 inline-flex items-center gap-2
                  bg-green-600 hover:bg-green-700
                  text-white
                  text-sm font-semibold
                  px-4 py-2 md:px-5 md:py-2.5
                  rounded-xl
                  shadow-md hover:shadow-lg
                  transition-all duration-200
                  hover:scale-105
                "
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
