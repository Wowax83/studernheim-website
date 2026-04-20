'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // 🔥 Smooth Scroll Werte (kein Snap mehr)
  const rawY = useTransform(scrollY, [0, 1000], [0, 80], { clamp: false })
  const rawScale = useTransform(scrollY, [0, 1000], [1, 1.03], { clamp: false })
  const rawOpacity = useTransform(scrollY, [0, 500], [1, 0])

  // 👉 smoothing gegen „springen“
  const y = useSpring(rawY, { stiffness: 40, damping: 20 })
  const scale = useSpring(rawScale, { stiffness: 40, damping: 20 })
  const opacity = useSpring(rawOpacity, { stiffness: 50, damping: 25 })

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
      {/* 🎬 Background */}
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
          quality={60}
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
      </motion.div>

      {/* Aurora */}
      <div className="absolute inset-0 aurora pointer-events-none opacity-70" />

      {/* Content */}
      <motion.div
        style={{
          opacity,
          y: useTransform(scrollY, [0, 600], [-20, -80])
        }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6">
          Studernheim
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl">
          Ein Dorf voller Leben, Tradition und Gemeinschaft
        </p>

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
