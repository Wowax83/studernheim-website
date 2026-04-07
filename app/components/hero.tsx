'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // 🔥 Scroll Effects
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const x = useTransform(scrollY, [0, 500], [0, 40])
  const scale = useTransform(scrollY, [0, 500], [1, 1.04])

  // 🔥 Blur
  const blur = useTransform(scrollY, [0, 300], [0, 2])
  const blurPx = useTransform(blur, (v) => `blur(${v}px)`)

  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // 🔥 Mouse Movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window

    const moveX = (e.clientX / innerWidth - 0.5) * 20
    const moveY = (e.clientY / innerHeight - 0.5) * 20

    mouseX.set(moveX)
    mouseY.set(moveY)
  }

  // 🔥 Combine Scroll + Mouse
  const xTotal = useTransform([x, mouseX], (v: number[]) => v[0] + v[1])
  const yTotal = useTransform([y, mouseY], (v: number[]) => v[0] + v[1])

  const smoothX = useSpring(xTotal, { stiffness: 40, damping: 20 })
  const smoothY = useSpring(yTotal, { stiffness: 40, damping: 20 })

  // 🔥 FIX: Scroll mit Offset (Navbar!)
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
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🎬 Background */}
      <motion.div
        animate={{
          x: [0, 10, -10, 0],
          y: [0, -5, 5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          x: smoothX,
          y: smoothY,
          scale,
          filter: blurPx,
          willChange: 'transform, filter'
        }}
        className="absolute -inset-10"
      >
        <Image
          src="/hero.webp"
          alt="Studernheim Landschaft"
          fill
          priority
          quality={75}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/hero.webp"
          className="object-cover"
        />

        {/* 🌑 Overlay (wichtig für Lesbarkeit!) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </motion.div>

      {/* Aurora (optional behalten) */}
      <div className="absolute inset-0 aurora pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{
          opacity,
          y: useTransform(scrollY, [0, 300], [0, -50])
        }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
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

        {/* Scroll Button */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white hover:scale-110 transition-all"
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
