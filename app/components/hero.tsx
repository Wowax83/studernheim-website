'use client'

import { useRef, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // 🔥 Scroll Effects (dezenter)
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const x = useTransform(scrollY, [0, 500], [0, 40])
  const scale = useTransform(scrollY, [0, 500], [1, 1.04])
  const blur = useTransform(scrollY, [0, 300], [0, 2]) // 👈 reduziert
  const blurPx = useTransform(blur, (v) => `blur(${v}px)`)
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // 🔥 Mouse Movement (dezenter)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window

    const moveX = (e.clientX / innerWidth - 0.5) * 20
    const moveY = (e.clientY / innerHeight - 0.5) * 20

    mouseX.set(moveX)
    mouseY.set(moveY)
  }

  // 🔥 Idle Movement (immer Bewegung)
  const idleX = useMotionValue(0)
  const idleY = useMotionValue(0)

  useEffect(() => {
    let direction = 1

    const interval = setInterval(() => {
      direction *= -1
      idleX.set(direction * 8)
      idleY.set(direction * 4)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // 🔥 Combine Scroll + Mouse + Idle
  const xTotal = useTransform(
    [x, mouseX, idleX],
    (v: number[]) => v[0] + v[1] + v[2]
  )

  const yTotal = useTransform(
    [y, mouseY, idleY],
    (v: number[]) => v[0] + v[1] + v[2]
  )

  const scrollToNext = () => {
    document.getElementById('sag')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🎬 Background Image */}
      <motion.div
        style={{
          x: xTotal,
          y: yTotal,
          scale,
          filter: blurPx,
          willChange: 'transform'
        }}
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

        {/* 🌅 Grund Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

        {/* 🌞 BEWEGTE LICHTQUELLE 🔥 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -20, 30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255, 220, 120, 0.25), transparent 60%)'
          }}
        />

        {/* 🌞 zweites Licht für Tiefe */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 30, -20, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background:
              'radial-gradient(circle at 70% 70%, rgba(255, 200, 100, 0.15), transparent 70%)'
          }}
        />
      </motion.div>

      {/* Aurora optional */}
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
