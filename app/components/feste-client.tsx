'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Calendar,
  MapPin,
  Info,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [pausedCards, setPausedCards] = useState<{ [key: string]: boolean }>(
    {}
  )
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number
  }>({})

  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // 🔄 Auto Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated: any = { ...prev }

        feste?.forEach((fest: any) => {
          const images = Array.isArray(fest.images)
            ? fest.images.filter(Boolean)
            : []

          if (pausedCards[fest._id]) return

          if (images.length > 1) {
            const current = prev[fest._id] || 0
            updated[fest._id] = (current + 1) % images.length
          }
        })

        return updated
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [feste, pausedCards])

  const nextImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feste?.map((fest: any, index: number) => {
            const images = Array.isArray(fest.images)
              ? fest.images.filter(Boolean)
              : []

            const currentIndex =
              images.length > 0
                ? (currentImageIndex[fest._id] || 0) % images.length
                : 0

            return (
              <motion.div
                key={fest._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => {
                  setHoveredCard(fest._id)
                  setPausedCards((p) => ({ ...p, [fest._id]: true }))
                }}
                onMouseLeave={() => {
                  setHoveredCard(null)
                  setPausedCards((p) => ({ ...p, [fest._id]: false }))
                }}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >

                {/* Slider */}
                <motion.div
                  className="relative aspect-[4/3]"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (images.length < 2) return
                    if (info.offset.x < -50)
                      setCurrentImageIndex((p) => ({
                        ...p,
                        [fest._id]: (currentIndex + 1) % images.length
                      }))
                    if (info.offset.x > 50)
                      setCurrentImageIndex((p) => ({
                        ...p,
                        [fest._id]: (currentIndex - 1 + images.length) % images.length
                      }))
                  }}
                >
                  {images.map((img: string, i: number) => (
                    <Image
                      key={i}
                      src={img}
                      alt=""
                      fill
                      onClick={() => {
                        setLightboxImages(images)
                        setLightboxIndex(i)
                      }}
                      className={`absolute inset-0 object-cover transition-opacity duration-700 ${
                        i === currentIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}

                  {/* Datum */}
                  {fest.date && (
                    <div className="absolute top-3 right-3 z-20 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {new Date(fest.date).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </div>
                  )}
                </motion.div>

                {/* 🔥 Content mit Hover Animation */}
                <motion.div
                  animate={{
                    y: hoveredCard === fest._id ? -5 : 0
                  }}
                  transition={{ duration: 0.25 }}
                  className="p-5"
                >
                  {fest.region && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin size={14} />
                      {fest.region}
                    </div>
                  )}

                  <h3 className="font-bold text-lg mb-2">{fest.name}</h3>

                  {fest.vibe && (
                    <p className="text-green-600 text-sm mb-2">
                      {fest.vibe}
                    </p>
                  )}

                  {/* 🔥 2 Zeilen Clamp */}
                  {fest.description && (
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {fest.description}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* LIGHTBOX */}
        {lightboxImages && (
          <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

            <button onClick={() => setLightboxImages(null)} className="absolute top-5 right-5 text-white">
              <X size={32} />
            </button>

            <button onClick={prevImage} className="absolute left-5 text-white">
              <ChevronLeft size={32} />
            </button>

            <button onClick={nextImage} className="absolute right-5 text-white">
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={lightboxIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80) nextImage()
                if (info.offset.x > 80) prevImage()
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl w-full px-4"
            >
              <Image
                src={lightboxImages[lightboxIndex]}
                alt=""
                width={1400}
                height={900}
                className="object-contain max-h-[90vh] w-full"
              />
            </motion.div>

          </motion.div>
        )}
      </div>
    </section>
  )
}
