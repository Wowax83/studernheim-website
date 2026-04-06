'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // 🔥 Parallax + Drift + Zoom
  const y = useTransform(scrollY, [0, 500], [0, 120])
  const x = useTransform(scrollY, [0, 500], [0, 50]) // 👉 seitlicher Drift
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]) // 👉 leichter Zoom
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const scrollToNext = () => {
    document.getElementById('sag')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      
      {/* Background Image */}
      <motion.div
        style={{ y, x, scale, willChange: 'transform' }} // 🔥 HIER geändert
        className="absolute inset-0"
      >
        <Image
          src="/hero.webp"
          alt="Studernheim Landschaft"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      </motion.div>

      {/* Aurora */}
      <div className="absolute inset-0 aurora pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
        >
          Studernheim
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl drop-shadow-lg"
        >
          Ein Dorf voller Leben, Tradition und Gemeinschaft
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={36} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  )
}
