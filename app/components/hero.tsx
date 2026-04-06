'use client'

import { useRef } from 'react'
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

  // 🔥 Scroll Effects
  const y = useTransform(scrollY, [0, 500], [0, 120])
  const x = useTransform(scrollY, [0, 500], [0, 50])
  const scale = useTransform(scrollY, [0, 500], [1, 1.05])
  const blur = useTransform(scrollY, [0, 300], [0, 6])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // 🔥 Mouse Movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window

    const moveX = (e.clientX / innerWidth - 0.5) * 30
    const moveY = (e.clientY / innerHeight - 0.5) * 30

    mouseX.set(moveX)
    mouseY.set(moveY)
  }

  // 🔥 Combine Scroll + Mouse (SAFE VERSION)
  const xTotal = useTransform([x, mouseX], (values: number[]) => values[0] + values[1])
  const yTotal = useTransform([y, mouseY], (values: number[]) => values[0] + values[1])

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
          filter: blur.to((v) => `blur(${v}px)`),
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

        {/* 🌅 Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

        {/* 🌞 Light Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/10 via-transparent to-transparent" />
      </motion.div>

      {/* Optional Aurora */}
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
