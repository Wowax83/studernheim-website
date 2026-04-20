'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // 🔥 Scroll Effekte (leicht)
  const y = useTransform(scrollY, [0, 500], [0, 60])
  const scale = useTransform(scrollY, [0, 500], [1, 1.02])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const scrollToNext = () => {
    const element = document.getElementById('sag')
    if (!element) return

    const yOffset = -80
    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🎬 Background (leichte Bewegung bleibt) */}
      <motion.div
        animate={{
          x: [0, 6, -6, 0],
          y: [0, -3, 3, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          y,
          scale,
          willChange: 'transform'
        }}
        className="absolute -inset-10"
      >
        <Image
          src="/hero.webp"
          alt="Studernheim Landschaft"
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
      </motion.div>

      {/* Aurora bleibt optional leicht */}
      <div className="absolute inset-0 aurora pointer-events-none opacity-70" />

      {/* Content */}
      <motion.div
        style={{
          opacity,
          y: useTransform(scrollY, [0, 300], [-40, -100])
        }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6"
        >
          Studernheim
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl"
        >
          Ein Dorf voller Leben, Tradition und Gemeinschaft
        </motion.p>

        {/* Scroll Button */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  )
}
