'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
  if (!Array.isArray(feste) || feste.length === 0) return null

  const nextFest = feste[0]

  const [time, setTime] = useState(
    nextFest?.date ? getTimeLeft(nextFest.date) : null
  )

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

  // 👉 Button aus Highlights
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
      
      {/* 🔥 Desktop zentriert */}
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            relative rounded-2xl overflow-hidden
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            border border-white/10
          "
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

            {/* Countdown */}
            {time && time.total > 0 ? (
              <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-md mt-4">
                {[
                  { label: 'Tage', value: time.days },
                  { label: 'Std', value: time.hours },
                  { label: 'Min', value: time.minutes },
                  { label: 'Sek', value: time.seconds }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 md:p-3 text-center"
                  >
                    <div className="text-lg md:text-2xl font-bold">
                      {item.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">
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
