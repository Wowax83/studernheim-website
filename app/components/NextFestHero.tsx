'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function getNextFest(feste: any[]) {
  const now = new Date()

  return feste
    ?.filter(f => f?.date && new Date(f.date) >= now)
    ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
}

function getTimeLeft(targetDate: string) {
  const total = new Date(targetDate).getTime() - new Date().getTime()

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60)
  }
}

export default function NextFestHero({ feste }: any) {
  const nextFest = getNextFest(feste)

  const [time, setTime] = useState(
    nextFest ? getTimeLeft(nextFest.date) : null
  )

  useEffect(() => {
    if (!nextFest) return

    const interval = setInterval(() => {
      setTime(getTimeLeft(nextFest.date))
    }, 1000)

    return () => clearInterval(interval)
  }, [nextFest])

  if (!nextFest) return null

  const image =
    Array.isArray(nextFest.images) && nextFest.images.length > 0
      ? nextFest.images[0]
      : null

  return (
    <section className="relative max-w-4xl ml-auto mr-6 md:mr-16 -mt-28 z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/10"
      >
        {/* Background */}
        {image && (
          <Image
            src={image}
            alt={nextFest.name}
            fill
            className="object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />

        {/* Content */}
        <div className="relative p-6 md:p-10 text-white">
          <p className="text-green-400 uppercase tracking-widest text-xs mb-2">
            Nächstes Fest
          </p>

          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            {nextFest.name}
          </h2>

          <p className="text-white/80 mb-6 text-sm md:text-base">
            {new Date(nextFest.date).toLocaleDateString('de-DE', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>

          {/* Countdown */}
          {time && time.total > 0 && (
            <div className="grid grid-cols-4 gap-3 max-w-md">
              {[
                { label: 'Tage', value: time.days },
                { label: 'Std', value: time.hours },
                { label: 'Min', value: time.minutes },
                { label: 'Sek', value: time.seconds }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center"
                >
                  <div className="text-xl md:text-2xl font-bold">
                    {item.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide opacity-70">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🔥 Button */}
          <button
            onClick={() => {
              document.getElementById('feste')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition hover:scale-105"
          >
            Zu den Highlights →
          </button>
        </div>
      </motion.div>
    </section>
  )
}
